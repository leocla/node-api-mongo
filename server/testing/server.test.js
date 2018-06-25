const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// get MODEL using ES6
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
//const {UserData} = require('./../models/user');


// const todos = [{
//     _id: new ObjectID(),
//     text: 'Pertama test todo'
// }, {
//     _id: new ObjectID(),
//     text: 'Kedua test todo',
//     completed: true,
//     completedAt : 333
// }, {
//     _id: new ObjectID(),
//     text : 'Test bagian ketiga'
// }];

const todos = [{
    _id: new ObjectID(),
    text: 'Pertama test todo'
}, {
    _id: new ObjectID(),
    text: 'Kedua test todo',
    completed: true,
    completedAt : 33323
}];
/*
beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

*/

beforeEach((done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done());
});
 

describe('TESTING POST /todos', () => {
    it('Harus bisa membuat todo BARU', (donedone) => {
        var text = 'Testing menggunakan todos Hahaha heheh';
        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return donedone(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    donedone();
                })
                .catch((e) => donedone(e));
        });
    });

   it('Harusnya tidak membuat \'TODO\' pada body data yang invalid', (donebro)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return donebro(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    donebro();
                })
                .catch((e) => donebro(e));

        });
   });
});

describe('GET /todos', ()=> {
    it('Harus dapat melakukan GET todos', (selesai)=> {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.data_todos.length).toBe(2);
            })
            .end(selesai);
    });
});

describe('GET /todos/:id', () => {
    it('Harus return ke todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo_ini.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('harus return 404 jika todo tidak ditemukan', (done) => {
        // make sure get 404 back
        var hexId = new ObjectID().toHexString();

        request(app)
            //.get(`todos/${todos[0]._id.toHexString()}`)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('harus return 404 untuk non-object id', (done)=> {
        // todos 123
        request(app)
            .get('/todos/1231dja') // ik mbuh kie wkwkwk
            .expect(404)
            .end(done);
    });
});


describe('DELETE /todos/:id', () => {
    it('harus bisa menghapus todo', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.asik._id).toBe(hexId);
            })
            .end((err, res)=> {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todos) => {
                    expect(todos).toNotExist();
                    done();
                }).catch((err) => {
                    done(err)
                });

            });
    });

    it('harus bisa return 404 jika todo tidak ditemukan', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });

    it('harus bisa return 404 untuk objectID is invalid', (done) => {
        // request(app)
        //     .delete('/todos/1231dja') // ik mbuh kie wkwkwk
        //     .expect(404)
        //     .end(done);
        // request(app)
        //     .delete('todos/1231dja')   // ini beda dg yang atas,,, ada /
        //     .expect(404)
        //     .end(done);
        request(app)
            .delete('/todos/123dsa')
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('harus update todo', (done) => {
        // pastikan id dari first item
        // update text, set completed to true
        // 200
        // text is changed, completed true, completedAt is a number toBeA
        var hexId = todos[0]._id.toHexString();
        var text = 'Ini harusnya jadi new text';
        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('harus clear completedAt ketika todo tidak selesai', (done) => {
        // grad id of second todo item
        // update text, set completed to false
        // 200
        // text is changed, completed false, completedAt is null, .toNotExist
        var hehe = todos[1]._id.toHexString();
        var text = 'INI HARUS jadi NEW TEXT!!!';

        request(app)
            .patch(`/todos/${hehe}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});