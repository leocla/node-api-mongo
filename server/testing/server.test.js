const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

// get MODEL using ES6
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
//const {UserData} = require('./../models/user');


const todos = [{
    _id: new ObjectID(),
    text: 'Pertama test todo'
}, {
    _id: new ObjectID(),
    text: 'Kedua test todo'
}, {
    _id: new ObjectID(),
    text : 'Test bagian ketiga'
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
                    expect(todos.length).toBe(3);
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
                expect(res.body.data_todos.length).toBe(3);
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
