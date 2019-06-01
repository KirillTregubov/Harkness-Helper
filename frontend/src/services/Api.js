export default {
  fetchUser (filter) {
    // return Api().get('contacts/' + filter)
    return {
      data: {
        name: 'Test',
        classes: [
          { name: 'Computer Science', code: 'ICS4Ua' },
          { name: 'English', code: 'ENG4Ua' }
        ]
      }
    }
  }

  // uploadImage (formData) {
  //   return Api().post('upload/', formData)
  // },

  // createContact (params) {
  //   return Api().post('contact', params)
  // },

  // updateContact (params) {
  //   return Api().put('contact/' + params.id, params)
  // },

  // fetchContact (params) {
  //   return Api().get('contact/' + params.id)
  // },

  // deleteContact (id) {
  //   return Api().delete('contact/' + id)
  // }
}
