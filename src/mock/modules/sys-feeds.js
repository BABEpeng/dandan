import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(Mock.mock({
    'userId': '../..increment',
    'username': '../..name',
    'email': '../..email',
    'mobile': /^1[0-9]{10}$/,
    'status': 1,
    'roleIdList': null,
    'createUserId': 1,
    'createTime': 'datetime'
  }))
}
// 获取feeds数据
export function feeds () {
  return {
    // isOpen: false,
    url: '/sys/feeds',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'content': [
        {
          'postId': 'b5mw31CboiQh31o/OqN6TX///qbKp1MXEar/3g+WLgA=',
          'postType': 'image',
          'author': {
            'authorId': '491527077:instagram',
            'nickname': 'manchesterunited',
            'avatar': '/static/images/roughness_map.jpg',
            'platform': 'instagram'
          },
          'content': '',
          'images': [
            {
              'imageId': 'b5mw31CboiQh31o/OqN6TX///qbKp1MXEar/3g+WLgA=imageDetailSplit137764826714843_6231605072384491520',
              'imageSpec': [
                {
                  'url': '/static/images/roughness_map.jpg',
                  'width': 320,
                  'height': 320,
                  'imageType': 'middle'
                },
                {
                  'url': '/static/images/roughness_map.jpg',
                  'width': 640,
                  'height': 640,
                  'imageType': 'large'
                }
              ]
            }
          ],
          'publishTime': 1482658721000,
          'likeCount': 0,
          'shareCount': 0,
          'commentCount': 10,
          'location': {
            'longitude': 0,
            'latitude': 0,
            'name': ''
          },
          'hotComments': [
            {
              '_id': '585fc36144de9f000930e381',
              'author': {
                'userId': '4071484644:instagram',
                'name': '__abdoullah',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': '👍❤',
              'commentTime': 1482670397000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585fc36144de9f000930e382',
              'author': {
                'userId': '4308993820:instagram',
                'name': 'takip_____kazan',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Gt',
              'commentTime': 1482670294000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585fc36144de9f000930e383',
              'author': {
                'userId': '1701397688:instagram',
                'name': 'cindyjcr',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Mo tunggu sukses dang ../..lisatambingon',
              'commentTime': 1482670032000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            }
          ],
          'isUserLike': false
        },
        {
          'postId': 'b5mw31CboiQh31o/OqN6TX///qbJlx9/i0/ZEOrbowA=',
          'postType': 'video',
          'author': {
            'authorId': '491527077:instagram',
            'nickname': 'manchesterunited',
            'avatar': '/static/images/roughness_map.jpg',
            'platform': 'instagram'
          },
          'content': '../..JuanMataGarcia made Christmas a little more enjoyable for some of Manchester',
          'images': [],
          'publishTime': 1482676560000,
          'likeCount': 0,
          'shareCount': 0,
          'commentCount': 10,
          'video': {
            'coverUrl': '/static/images/roughness_map.jpg',
            'videoUrl': '/static/images/kinect.mp4',
            'width': 0,
            'height': 0
          },
          'location': {
            'longitude': 0,
            'latitude': 0,
            'name': ''
          },
          'hotComments': [
            {
              '_id': '586075b344de9f000930e3ef',
              'author': {
                'userId': '3088419284:instagram',
                'name': 'sami_ozil10',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Oh',
              'commentTime': 1482707127000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '586075b344de9f000930e3f0',
              'author': {
                'userId': '3324315574:instagram',
                'name': 'king_t.man',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'I love you juan mata#the special juan',
              'commentTime': 1482706918000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '586075b344de9f000930e3f1',
              'author': {
                'userId': '4227111654:instagram',
                'name': 'sweetjannifer__863',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'BÒYŚֺ WHÒ WǍŃT TÒ ŚֺPĖŃĎ THĖֺ ŃÌǴHT ĎÒ ŃֺÒֺT FֺÒRǴֺĖT . YÒֺǛֺ ǴÒ TÒ MY PǍֺǴֺĖ',
              'commentTime': 1482706821000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            }
          ],
          'isUserLike': false
        },
        {
          'postId': 'b5mw31CboiQh31o/OqN6TX///qbJlx9/i0/ZEOr123=',
          'postType': 'video',
          'author': {
            'authorId': '491527077:instagram',
            'nickname': 'manchesterunited',
            'avatar': '/static/images/roughness_map.jpg',
            'platform': 'instagram'
          },
          'content': '../..JuanMataGarcia made Christmas a little more enjoyable for some of Manchester',
          'images': [],
          'publishTime': 1482676560000,
          'likeCount': 0,
          'shareCount': 0,
          'commentCount': 10,
          'video': {
            'coverUrl': '/static/images/roughness_map.jpg',
            'videoUrl': '/static/images/kinect.mp4',
            'width': 0,
            'height': 0
          },
          'location': {
            'longitude': 0,
            'latitude': 0,
            'name': ''
          },
          'hotComments': [
            {
              '_id': '586075b344de9f000930e3ef',
              'author': {
                'userId': '3088419284:instagram',
                'name': 'sami_ozil10',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Oh',
              'commentTime': 1482707127000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '586075b344de9f000930e3f0',
              'author': {
                'userId': '3324315574:instagram',
                'name': 'king_t.man',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'I love you juan mata#the special juan',
              'commentTime': 1482706918000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '586075b344de9f000930e3f1',
              'author': {
                'userId': '4227111654:instagram',
                'name': 'sweetjannifer__863',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'BÒYŚֺ WHÒ WǍŃT TÒ ŚֺPĖŃĎ THĖֺ ŃÌǴHT ĎÒ ŃֺÒֺT FֺÒRǴֺĖT . YÒֺǛֺ ǴÒ TÒ MY PǍֺǴֺĖ',
              'commentTime': 1482706821000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            }
          ],
          'isUserLike': false
        },
        {
          'postId': 'b5mw31CboiQh31o/OqN6TX///qbNhMi318IhUCjp0AA=',
          'postType': 'image',
          'author': {
            'authorId': '491527077:instagram',
            'nickname': 'manchesterunited',
            'avatar': '/static/images/roughness_map.jpg',
            'platform': 'instagram'
          },
          'content': 'We re feeling festive at Old Trafford! #MUFCXMAS',
          'images': [
            {
              'imageId': 'b5mw31CboiQh31o/OqN6TX///qbNhMi318IhUCjp0AA=imageDetailSplit1636131636681013_7961489763158982656',
              'imageSpec': [
                {
                  'url': '/static/images/roughness_map.jpg',
                  'width': 320,
                  'height': 320,
                  'imageType': 'middle'
                },
                {
                  'url': '/static/images/roughness_map.jpg',
                  'width': 640,
                  'height': 640,
                  'imageType': 'large'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }
          ],
          'publishTime': 1482610653000,
          'likeCount': 0,
          'shareCount': 0,
          'commentCount': 10,
          'location': {
            'longitude': -2.290501117706299,
            'latitude': 53.4632568359375,
            'name': 'Old Trafford'
          },
          'hotComments': [
            {
              '_id': '585fca3e44de9f000930e395',
              'author': {
                'userId': '3588018762:instagram',
                'name': 'fansofmanchesterunitedfc',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Feel free to follow for more Man United informations🤗🤗🤗🔥🔥🔥',
              'commentTime': 1482669730000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585fca3e44de9f000930e396',
              'author': {
                'userId': '3588018762:instagram',
                'name': 'fansofmanchesterunitedfc',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Feel free to follow for more Man United informations🤗🤗🤗🔥🔥🔥',
              'commentTime': 1482669727000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585fca3e44de9f000930e397',
              'author': {
                'userId': '2193001249:instagram',
                'name': 'shujat_syed007',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Follow ../..aakid_the.innocent.devil',
              'commentTime': 1482669623000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            }
          ],
          'isUserLike': false
        },
        {
          'postId': 'b5mw31CboiQh31o/OqN6TX///qbN4OLXFNZajYjZUQA=',
          'postType': 'image',
          'author': {
            'authorId': '491527077:instagram',
            'nickname': 'raphaelvarane',
            'avatar': '/static/images/roughness_map.jpg',
            'platform': 'facebook'
          },
          'content': 'Nicky Butt, ../..JuanMataGarcia and ../..ChevroletFC​ helped make United fan Liams recent trip to the training ground extra memorable... #MUFCXMAS',
          'images': [
            {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }
          ],
          'publishTime': 1482604617000,
          'likeCount': 0,
          'shareCount': 0,
          'commentCount': 10,
          'video': {
            'coverUrl': '/static/images/roughness_map.jpg',
            'videoUrl': '/static/images/roughness_map.jpg',
            'width': 0,
            'height': 0
          },
          'location': {
            'longitude': 0,
            'latitude': 0,
            'name': ''
          },
          'hotComments': [
            {
              '_id': '585fca3e44de9f000930e39f',
              'author': {
                'userId': '4071484644:instagram',
                'name': '__abdoullah',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': '👍❤',
              'commentTime': 1482670374000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585fca3e44de9f000930e3a0',
              'author': {
                'userId': '3588018762:instagram',
                'name': 'fansofmanchesterunitedfc',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Just feel free to follow us for more Man United latest updates🤗🤗🤗🔥🔥🔥',
              'commentTime': 1482669843000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585fca3e44de9f000930e3a1',
              'author': {
                'userId': '2193001249:instagram',
                'name': 'shujat_syed007',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Follow ../..aakid_the.innocent.devil',
              'commentTime': 1482669655000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            }
          ],
          'isUserLike': false
        },
        {
          'postId': 'b5mw31CboiQh31o/OqN6TX///qbPQBEvOk3GbfTXiwA=',
          'postType': 'image',
          'author': {
            'authorId': '491527077:instagram',
            'nickname': 'nba',
            'avatar': '/static/images/roughness_map.jpg',
            'platform': 'facebook'
          },
          'content': 'The ../..lakers defeat the ../..laclippers 111-102 on ../..juliusrandle30',
          'images': [
            {
              'imageId': 'b5mw31CboiQh31o/OqN6TX///qbPQBEvOk3GbfTXiwA=imageDetailSplit1281897711881938_8145216597087223808',
              'imageSpec': [
                {
                  'url': '/static/images/roughness_map.jpg',
                  'width': 320,
                  'height': 320,
                  'imageType': 'middle'
                },
                {
                  'url': '/static/images/roughness_map.jpg',
                  'width': 640,
                  'height': 640,
                  'imageType': 'large'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }, {
              'imageSpec': [
                {}, {
                  'url': '/static/images/roughness_map.jpg'
                }
              ]
            }
          ],
          'publishTime': 1482581602000,
          'likeCount': 0,
          'shareCount': 0,
          'commentCount': 10,
          'location': {
            'longitude': -2.290501117706299,
            'latitude': 53.4632568359375,
            'name': 'Old Trafford'
          },
          'hotComments': [
            {
              '_id': '585e7bfb44de9f000930e35c',
              'author': {
                'userId': '528773241:instagram',
                'name': 'enestee_slr',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Whipping and kicking',
              'commentTime': 1482585579000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585e7bfb44de9f000930e35d',
              'author': {
                'userId': '1307001687:instagram',
                'name': 'ramonesimpson',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': 'Wat time is this gonna start',
              'commentTime': 1482585491000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            },
            {
              '_id': '585e7bfb44de9f000930e35e',
              'author': {
                'userId': '1586627873:instagram',
                'name': 'eddyspace',
                'avatar': '/static/images/roughness_map.jpg'
              },
              'text': '2-0 let',
              'commentTime': 1482585462000,
              'likeCount': 0,
              'isUserLike': false,
              'isReply': false
            }
          ],
          'isUserLike': false
        }
      ]
    }
  }
}
