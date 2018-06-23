const expect = require('expect');
const request = require('supertest');

// get MODEL using ES6
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
//const {UserData} = require('./../models/user');


beforeEach((done) => {
    Todo.remove({}).then(() => done());
});
 
describe('TESTING POST /todos', () => {
    it('Harus bisa membuat todo BARU', () => {
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
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
                expect(todos[0].text).toBe(text);
                //done();
            })
            //.catch((e) => done(e));
        });
    });

   it('Harusnya tidak membuat \'TODO\' pada body data yang invalid', ()=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    //done();
                })
                //.catch((e) => done(e));

            });
   });
});