import _ from 'underscore';
import Offices from '../models/office';
import Parties from '../models/party';
import Users from '../models/user';
import Elections from '../models/election';
import { validateCandidate, validateOffice } from '../helpers/validations';

class Office {
  // create a political office

  static async create(req, res) {
    const error = validateOffice(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const office = await Offices.checkOffice(req.body.name);
    if (office.length === 1) {
      return res.status(409).send({
        status: 409,
        error: 'office exist already',
      });
    }

    const newOffice = await Offices.createOffice(req.body);
    return res.status(201).send({
      status: 201,
      data: newOffice,
    });
  }

  // get all political offices

  static async getAll(req, res) {
    const offices = await Offices.getAllOffices();
    res.status(200).send({
      status: 200,
      data: offices,
    });
  }

  // get specific political office

  static async getOne(req, res) {
    const result = await Offices.getSpecificOffice(req.params.id);
    if (result.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'political office not found',
      });
    }
    return res.status(200).send({
      status: 200,
      data: result,
    });
  }

  // register a candidate/ to run for a specific political office

  static async register(req, res) {
    const error = validateCandidate(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const candidate = await Offices.checkCandidate(req.body.candidate);
    if (candidate.length !== 0) {
      return res.status(409).send({
        status: 409,
        error: 'you have already registered as a candidate',
      });
    }

    const party = await Parties.getSpecificParty(req.body.party);
    if (party.length !== 1) {
      return res.status(404).send({
        status: 404,
        error: 'political party not found',
      });
    }
    const office = await Offices.getSpecificOffice(req.params.id);
    if (office.length !== 1) {
      return res.status(404).send({
        status: 404,
        error: 'Political office not found',
      });
    }

    const user = await Users.getSpecificUser(req.body.candidate);
    if (user.length !== 1) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }

    const newCandidate = await Elections.addCandidate(req.body, req.params.id);
    return res.status(200).send({
      status: 200,
      data: newCandidate,
    });
  }

  static async voteResult(req, res) {
    const result = await Elections.getResults(req.params.id);
    const newRes = [];
    for (let i = 0; i < result.length; i++) {
      newRes.push(_.omit(result[i], 'party', 'id'));
    }
    return res.status(200).send({
      status: 200,
      data: newRes,
    });
  }
}

export default Office;
