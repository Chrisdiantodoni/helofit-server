const userModel = require("../../models/user");

const { general } = require("../../../utils");
const { responseJSON } = general;

class Wallet {
  async topUp(req, res) {
    const { userId } = req.params;
    const { nominal } = req.body;
    try {
      await userModel
        .findOne({
          where: {
            id: userId,
          },
        })
        .then((result) => {
          if (result) {
            result.update({
              balance: parseInt(result.dataValues?.balance) + parseInt(nominal),
            });
          }
        });
      responseJSON({
        res,
        status: 200,
        data: {
          nominal,
        },
      });
    } catch (error) {
      responseJSON({
        res: res,
        data: error,
        status: 500,
      });
    }
  }
  async withdraw(req, res) {
    const { userId } = req.params;
    const { nominal } = req.body;

    try {
      await userModel
        .findOne({
          where: {
            id: userId,
          },
        })
        .then((result) => {
          if (result) {
            result.update({
              balance: result.dataValues?.balance - parseInt(nominal),
            });
          }
        });
      responseJSON({
        res,
        status: 200,
        data: {
          nominal,
        },
      });
    } catch (error) {
      responseJSON({
        res: res,
        data: error,
        status: 500,
      });
    }
  }
}

module.exports = new Wallet();
