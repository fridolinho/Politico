import Parties from '../models/party';
import { validateParty } from '../helpers/validations';

class Party {
  // create a new political party

  static async create(req, res) {
    const error = validateParty(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const party = await Parties.checkParty(req.body.name);
    if (party.length !== 0) {
      return res.status(409).send({
        status: 409,
        error: 'party name has been taken',
      });
    }
    const newParty = await Parties.createParty(req.body);
    return res.status(201).send({
      status: 201,
      data: newParty,
    });
  }

  // get all political parties

  static async getAll(req, res) {
    const parties = await Parties.getAllParties();
    res.status(200).send({
      status: 200,
      data: parties,
    });
  }

  // Fetch a specific political party record

  static async getOne(req, res) {
    const result = await Parties.getSpecificParty(req.params.id);
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

  // Update a specific political party

  static async update(req, res) {
    const error = validateParty(req.body, req.method);
    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const result = await Parties.getSpecificParty(req.params.id);
    if (result.length !== 0) {
      const party = await Parties.checkParty(req.body.name);
      console.log(party);
      if (party.length !== 0) {
        return res.status(409).send({
          status: 409,
          error: 'party name or logoUrl exist already',
        });
      }
      Parties.updateParty(req.params.id, req.body, result);
      return res.status(200).send({
        status: 200,
        data: result,
      });
    }

    return res.status(404).send({
      status: 404,
      error: 'political party not found',
    });
  }

  // delete a particular political party

  static async remove(req, res) {
    const result = await Parties.getSpecificParty(req.params.id);

    if (result.length !== 0) {
      console.log(result);
      await Parties.deleteParty(req.params.id);
      return res.status(200).send({
        status: 200,
        message: 'Political party deleted',
      });
    }
    return res.status(404).send({
      status: 404,
      error: 'political party not found',
    });
  }
}

export default Party;
