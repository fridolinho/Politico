import Offices from '../models/office';
import { validateOffice } from '../helpers/validations';

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
    if (office.length !== 0) {
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
    const offices = Offices.getAllOffices();
    res.status(200).send({
      status: 200,
      data: offices,
    });
  }

  // get specific political office

  static async getOne(req, res) {
    const result = Offices.getSpecificOffice(req.params.id);
    if (!result) {
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
}

export default Office;
