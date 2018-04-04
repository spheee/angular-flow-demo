import {
  InMemoryDbService
} from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const sceneDialogs = [{
        id: 11,
        name: 'Mr. Nice'
      },
      {
        id: 12,
        name: 'Narco'
      },
      {
        id: 13,
        name: 'Bombasto'
      },
      {
        id: 14,
        name: 'Celeritas'
      },
      {
        id: 15,
        name: 'Magneta'
      },
      {
        id: 16,
        name: 'RubberMan'
      },
      {
        id: 17,
        name: 'Dynama'
      },
      {
        id: 18,
        name: 'Dr IQ'
      },
      {
        id: 19,
        name: 'Magma'
      },
      {
        id: 20,
        name: 'Tornado'
      }
    ];
    return {
      sceneDialogs
    };
    // const SceneDialogs = [{
    //     id: 11,
    //     name: 'aaaa',
    //     uuid: '123',
    //     group: 'A',
    //     dialogType: 0,
    //     nextDialog: '124',
    //     errorDialog: ''
    //   },
    //   {
    //     id: 12,
    //     name: 'bbbb',
    //     uuid: '124',
    //     group: 'A',
    //     dialogType: 0,
    //     nextDialog: '125',
    //     errorDialog: ''
    //   },
    //   {
    //     id: 13,
    //     name: 'cccc',
    //     uuid: '125',
    //     group: 'A',
    //     dialogType: 0,
    //     nextDialog: '126',
    //     errorDialog: ''
    //   },
    //   {
    //     id: 14,
    //     name: 'dddd',
    //     uuid: '126',
    //     group: 'A',
    //     dialogType: 0,
    //     nextDialog: '127',
    //     errorDialog: ''
    //   },
    //   // {
    //   //   id: 15,
    //   //   name: 'eeee',
    //   //   uuid: '127',
    //   //   group: 'A',
    //   //   dialogType: 0,
    //   //   nextDialog: '128',
    //   //   errorDialog: ''
    //   // },
    //   // {
    //   //   id: 16,
    //   //   name: 'ffff',
    //   //   uuid: '128',
    //   //   group: 'A',
    //   //   dialogType: 0,
    //   //   nextDialog: '129',
    //   //   errorDialog: ''
    //   // },
    //   // {
    //   //   id: 17,
    //   //   name: 'gggg',
    //   //   uuid: '129',
    //   //   group: 'A',
    //   //   dialogType: 0,
    //   //   nextDialog: '130',
    //   //   errorDialog: ''
    //   // },
    //   // {
    //   //   id: 18,
    //   //   name: 'hhhh',
    //   //   uuid: '130',
    //   //   group: 'A',
    //   //   dialogType: 0,
    //   //   nextDialog: '131',
    //   //   errorDialog: ''
    //   // },
    //   // {
    //   //   id: 19,
    //   //   name: 'iiii',
    //   //   uuid: '131',
    //   //   group: 'A',
    //   //   dialogType: 0,
    //   //   nextDialog: '132',
    //   //   errorDialog: ''
    //   // },
    //   // {
    //   //   id: 20,
    //   //   name: 'jjjj',
    //   //   uuid: '132',
    //   //   group: 'A',
    //   //   dialogType: 0,
    //   //   nextDialog: '133',
    //   //   errorDialog: ''
    //   // },
    //   // {
    //   //   id: 21,
    //   //   name: 'kkkk',
    //   //   uuid: '133',
    //   //   group: 'A',
    //   //   dialogType: 0,
    //   //   nextDialog: '',
    //   //   errorDialog: ''
    //   // },

    // ];
    // return {SceneDialogs};
  }
}
