import Elections from '../models/election';
import Offices from '../models/office';
import Users from '../models/user';
import { validateVote, validatePetition } from '../helpers/validations';

class Election {
  static async vote(req, res) {
    const error = validateVote(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }
 
    const vote = await Elections.checkVote(req.body);
    if (vote.length > 0) {
      return res.status(409).send({
        status: 409,
        error: 'You have voted already',
      });
    }

    const voter = await Users.getSpecificUser(req.body.voter);
    if (voter.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }

    const office = await Offices.getSpecificOffice(req.body.office);
    if (office.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'political office not found',
      });
    }

    const user = await Users.getSpecificUser(req.body.candidate);
    if (user.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'Candidate not found',
      });
    }

    const results = await Elections.registerVote(req.body);
    if (results.length !== 0) {
      Elections.updateCandidate(req.body.candidate);
      return res.status(200).send({
        status: 200,
        data: {
          office: results[0].office,
          candidate: results[0].candidate,
          voter: results[0].createdBy,
        },
      });
    }
  }

  static async registerPetition(req, res) {
    const error = validatePetition(req.body);

    if (error) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message,
      });
    }

    const petition = await Elections.checkPetition(req.body);
    if (petition.length > 0) {
      return res.status(409).send({
        status: 409,
        error: 'petition created already',
      });
    }

    const user = await Users.getSpecificUser(req.body.createdBy);
    if (user.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'You are not registered as a user',
      });
    }

    const office = await Offices.getSpecificOffice(req.body.office);
    if (office.length === 0) {
      return res.status(404).send({
        status: 404,
        error: 'political office not found',
      });
    }

    const results = await Elections.registerPetition(req.body);
    if (results.length !== 0) {
      return res.status(200).send({
        status: 200,
        data: results
      })
    }
  }
}

export default Election;
