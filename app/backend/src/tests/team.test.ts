import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import mockSingleTeam from './mocks/teamMock'
import mockArrayTeam from './mocks/teamMock';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);
const { expect } = chai;

describe('testando endpoint /', () => {
    let createStub: sinon.SinonStub;

    beforeEach(() => {
        createStub = sinon.stub(Teams, 'findAll').resolves(mockArrayTeam as unknown as Teams[]);
    });

    afterEach (() => {
        createStub.restore();
    });

    it('testando se função findAllTimes retorna uma array de times', async () => {
       const { status, body } = await chai.request(app).get('/teams')

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(mockArrayTeam);
    });
});

describe('testando endpoint /teams/:id', () => {
    let createStub: sinon.SinonStub;

    beforeEach(() => {
        createStub = sinon.stub(Teams, 'findByPk').resolves(mockSingleTeam as unknown as Teams);
    });

    afterEach (() => {  
        createStub.restore();
    });

    it('testando se função findById retorna o id corretamente', async () => {
        const { status, body } = await chai.request(app).get('/teams/5')
    
         expect(status).to.be.equal(200);
         expect(body).to.be.deep.equal(mockArrayTeam);
     });
});
