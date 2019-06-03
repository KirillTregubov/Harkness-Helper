export default {
  fetchUser (filter) {
    // return Api().get('contacts/' + filter)
    return {
      data: {
        name: 'Test',
        classes: [{
          name: 'Computer Science',
          classCode: 'ICS4Ua',
          year: '2018-2019',
          block: '2',
          students: [{
            name: 'Alexander Alexiev',
            picture: 'https://edsbypublicca.blob.core.windows.net/cp1/b311a344685369f1b6b8db43c52127d77977'
          },
          {
            name: 'STUDENT MISSING (NO IMG)'
          }
          ],
          stats: [{
            title: 'Textual references',
            classScore: '4+',
            kica: 'K'
          },
          {
            title: 'Generates ideas',
            classScore: '3',
            kica: 'I'
          },
          {
            title: 'Maintains engaged body language',
            classScore: '2-',
            kica: 'C'
          },
          {
            title: 'Contributes cooperatively',
            classScore: '3+',
            kica: 'A'
          }
          ],
          harkness: [{
            name: 'Harkness 1',
            date: 'June 27',
            stats: [{
              title: 'Text references',
              kica: 'K',
              students: [{
                studentId: '123',
                score: '2-'
              },
              {
                studentId: '456',
                score: '3-'
              }
              ]
            },
            {
              title: 'Body language',
              kica: 'C',
              students: [{
                studentId: '139',
                score: '4-'
              },
              {
                studentId: '349',
                score: '3+'
              }
              ]
            }
            ]
          },
          {
            name: 'Harkness 2',
            date: 'June 23',
            stats: [{
              title: 'Text references',
              kica: 'K',
              students: [{
                studentId: '483',
                score: '2-'
              },
              {
                studentId: '393',
                score: '3-'
              }
              ]
            },
            {
              title: 'Body language',
              kica: 'C',
              students: [{
                studentId: '123',
                score: '4-'
              },
              {
                studentId: '456',
                score: '3+'
              }
              ]
            }
            ]
          }
          ]
        },
        {
          name: 'English',
          classCode: 'ENG4Ua',
          year: '2018-2019',
          block: '4',
          students: [{
            name: 'Alexander Alexiev',
            picture: 'https://edsbypublicca.blob.core.windows.net/cp1/b311a344685369f1b6b8db43c52127d77977'
          },
          {
            name: 'STUDENT MISSING (NO IMG)'
          }
          ],
          stats: {
            // here
          },
          harkness: []
        }
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
