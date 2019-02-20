import Elections from '../models/election';
import Offices from '../models/office';
import Users from '../models/user';
import { validateVote } from '../helpers/validations';

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
}

export default Election;
