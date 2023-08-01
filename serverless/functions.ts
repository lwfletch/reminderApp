import type { AWS } from '@serverless/typescript';

const functions: AWS["functions"] = {
    setReminder: {
        handler: 'src/functions/setReminder/index.handler',
        events: [
            {
                httpApi: {
                    path: '/',
                    method: 'post'
                }
            }
        ]
    },
    getReminders: {
        handler: 'src/functions/getReminders/index.handler',
        events: [
            {
                httpApi: {
                    path: '/{userId}',
                    method: 'get'
                }
            }
        ]
    },
    sendReminder: {
        handler: 'src/functions/sendReminder/index.handler',
        events: [
            {
                stream: {
                    type: 'dynamodb',
                    arn: {
                        'Fn::GetAtt': ["reminderTable", "StreamArn"]
                    },
                    filterPatterns: [
                        { eventName: ['REMOVE']}
                    ]
                }
            }
        ],
        //@ts-expect-error
        //sns:Publish should be in Action array
        iamRoleStatements: [{
            Effect: 'Allow',
            Action: ['ses:SendEmail',],
            Resource: '*',
        }]
    }
}

export default functions;