import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/Users'

//import mockArrayTeam from './mocks/teamMock';

const objectWithoutEmail = {
  password: '123456'
}
const objectWithoutPassword = {
  email: 'admin@admin.com'
}
const objectInvalid = {
  email: 123,
  password: 12345
}
const objectEmailInvalid = {
  email: 'admina*dmincom',
  password: '123456'
}
const objectSucess = {
  id: 1,
  username: 'stariel',
  role: 'exemplo_Sucess',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  email: 'admin@admin.com',
}

const mockReturnModelfindUser = {
  id: 5,
  email: 'admin@admin',
  password: '1234567',
  username: 'user',
  role: 'exemplo',
};

chai.use(chaiHttp);
const { expect } = chai;

describe('testando endpoint /login', () => {
    let createStub: sinon.SinonStub;

    afterEach(() => {
      sinon.restore();
    });

    it('Se é possível fazer um login com sucesso ', async () => {
      createStub = sinon.stub(User, 'findOne').resolves(objectSucess as unknown as User);
      
      const resp = await chai.request(app)
      .post('/login').send({ email: 'admin@admin.com', password: 'secret_admin'});

      expect(resp.status).to.be.equal(200);
      expect(resp.body.token).not.to.be.empty;
    });

    it('se não tiver email', async () => {
       const { status, body } = await chai.request(app)
       .post('/login').send(objectWithoutEmail)

        expect(status).to.be.equal(400);
        expect(body.message).to.be.equal('All fields must be filled')
    });

    it('se não tiver password', async () => {
      const { status, body } = await chai.request(app)
      .post('/login').send(objectWithoutPassword)

       expect(status).to.be.equal(400);
       expect(body.message).to.be.equal('All fields must be filled')
   });

    it('se email/password forem invalidos', async () => {
    const { status, body } = await chai.request(app)
    .post('/login').send(objectInvalid)

     expect(status).to.be.equal(401);
     expect(body.message).to.be.equal('Invalid email or password')
    });

    it('se email tiver o formato errado', async () => {
      const { status, body } = await chai.request(app)
      .post('/login').send(objectEmailInvalid)

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Invalid email or password')
    });

    it('se email não tiver cadastrado no banco de dados', async () => {
      createStub = sinon.stub(User, 'findOne').resolves(undefined);
      
      const { status, body } = await chai.request(app)
      .post('/login').send({ email: 'star@teste', password: '123456'});

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Invalid email or password')
    });

    it('se password não tiver cadastrado no banco de dados', async () => {
      createStub = sinon.stub(User, 'findOne').resolves(mockReturnModelfindUser as unknown as User);
      
      const { status, body } = await chai.request(app)
      .post('/login').send({ email: 'admin@admin.com', password: '0234367'});

      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal('Invalid email or password')
    });
});

describe('testando endpoint /login/role', () => {
  it('o token não for enviado', async () => {
    const response = await chai.request(app)
      .get('/login/role');

    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token not found');
  });
  it('Caso um token sejá seja inválido, retorna erro', async () => {
    const { status, body} = await chai.request(app)
      .get('/login/role')
      .set('Authorization', 'invalid_token');

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Token must be a valid token');
  });
});