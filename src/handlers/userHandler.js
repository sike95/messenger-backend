const GraphAPIService = require('../services/graph-api.service');
const CustomerService = require('../services/customer.service');


class UserHandler {

   async handelUserInfo(senderPsid) {
        let _graphApi = new GraphAPIService();

        const userData = await _graphApi.getUserProfile(senderPsid);

        const customer = {
            Id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            profileImage: userData.profilePic,
            location: 'guy',
        }
        await this.updateUserInfomation(customer);
    }

    async updateUserInfomation(customer){
        let customerService = new CustomerService();
        let id = customer.Id

        customerService.getRecordById(id)
        .then(async(doc) => {
            if (!doc){
                await customerService.createRecord(customer);
            }
        });
    }
}

module.exports = UserHandler;