/**
* Module for user provided API configurations
* @module api/config
*/

/** @lends module:api/config */
var countlyConfig = {
    /**
    * MongoDB connection definition and options
    * @type {object} 
    * @property {string} [host=localhost] - host where to connect to mongodb, default localhost
    * @property {array=} replSetServers - array with multiple hosts, if you are connecting to replica set, provide this instead of host
    * @property {string=} replicaName - replica name, must provide for replica set connection to work
    * @property {string} [db=countly] - countly database name, default countly
    * @property {number} [port=27017] - port to use for mongodb connection, default 27017
    * @property {number} [max_pool_size=500] - how large pool size connection per process to create, default 500 per process, not recommended to be more than 1000 per server
    * @property {string=} username - username for authenticating user, if mongodb supports authentication
    * @property {string=} password - password for authenticating user, if mongodb supports authentication
    * @property {object=} dbOptions - provide raw driver database options
    * @property {object=} serverOptions - provide raw driver server options, used for all, single, mongos and replica set servers
    */
    mongodb: {
        replSetServers : [
            'mongodb-0.mongodb.countly.svc.cluster.local:27017',
            'mongodb-1.mongodb.countly.svc.cluster.local:27017',
	    'mongodb-2.mongodb.countly.svc.cluster.local:27017'
        ],
		replicaName: "rs0",
        db: "countly",
		username: "test",
		password: "test",
        max_pool_size: 1000,
        dbOptions:{
            //db options
            native_parser: true
        },
        serverOptions:{
            //server options
            ssl:false
        }
    },
    /*  or define as a url
	//mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
	mongodb: "mongodb://localhost:27017/countly",
    */
    /**
     * Redis configuration. 
     * @property {string} host - host of redis, ip or hostname
     * @property {number} port - port of redis
     * @property {string} instanceId - redis instance id in Tencent cloud
     * @property {string} pwd - password of redis
     */
    redis: {
        host: "localhost",
        port: 32772,
        instanceId: "",
        pwd: "",
    },

    /**
     * Define events of apps which will be published to Redis
     * NOTE!!! you must provide 'redis' configuration before use this option.
     * @property {string} redis_pub_topic - the topic of publish events in Redis.
     * @property {array=} apps - the array of applications, include app_id and filter_keys.
     *      @property {string} app_id - App Id that defined in Countly, which can be found from 'Management -> Applications'
     *      @property {array=} filter_keys - Each application can have multiple filters, relationship is 'OR' among them,
     *                                      which means each item of 'filter_keys' can get a kind of records.
     *          @property {array=} object - key/value pair, the record must match all of the filters.
     *                                      {string} key - the property path of Countly Event.
     *                                      {array=} values - multiple values, matches one is ok (relation is 'OR').
     * Tips: 
     *  1. If 'apps' is empty(set to []), means filter nothing, no records will be published.
     *  2. if 'filter_keys' is empty (set to []), means publish all events of the 'app_id'
     */
    yx_event_publish: {
        redis_pub_topic: "paywall-event",
        apps: [
            {
                app_id: "xxxxxxxxxxx", // MacOS 
                filter_keys: [
                    [
                        {key: "event.segmentation.cd5", values: ["YX23232323","adfadfa"]}, // AND
                        {key: "event.segmentation.cd6", values: ["Basic"]},
                    ], // OR
                ],
            },
            {
                app_id: "xxxxxxxxxxxxx", // iOS
                filter_keys: [
                    [
                        {key: "event.segmentation.action", values: ["success_yx_signup"]},
                    ],
                ],
            },
        ],
    },
    /**
    * Default API configuration
    * @type {object} 
    * @property {number} [port=3001] - api port number to use, default 3001
    * @property {string} [host=localhost] - host to which to bind connection
    * @property {number} [max_sockets=1024] - maximal amount of sockets to open simultaneously
    * @property {number} workers - amount of paralel countly processes to run, defaults to cpu/core amount
    * @property {number} [timeout=120000] - nodejs server request timeout, need to also increase nginx timeout too for longer requests
    * @property {object=} push_proxy - push proxy settings
    */
    api: {
        port: 3001,
        host: "localhost",
	domain: "https://analytics.yinxiang.com",
        max_sockets: 1024,
        timeout: 120000
        /* GCM proxy server for push plugin
        push_proxy: {
            host: 'localhost',
            port: 8888
        } */
    },
    /**
    * Path to use for countly directory, empty path if installed at root of website
    * @type {string} 
    */
    path: "",
    /**
    * Default logging settings
    * @type {object} 
    * @property {string} [default=warn] - default level of logging for {@link logger}
    * @property {array=} info - modules to log for information level for {@link logger}
    */
    logging: {
        info: ["jobs", "push"],
        default: "warn"
    },
    /**
    * Default proxy settings, if provided then countly uses ip address from the right side of x-forwarded-for header ignoring list of provided proxy ip addresses
    * @type {array=} 
    */
    ignoreProxies: [/*"127.0.0.1"*/],

    /**
    * Default settings to be used for {@link module:api/utils/utils.encrypt} and {@link module:api/utils/utils.decrypt} functions and for commandline
    * @type {object}
    * @property {string} key - key used for encryption and decryption
    * @property {string|Buffer} iv - initialization vector to make encryption more secure
    * @property {string} algorithm - name of the algorithm to use for encryption. The algorithm is dependent on OpenSSL, examples are 'aes192', etc. On recent OpenSSL releases, openssl list-cipher-algorithms will display the available cipher algorithms. Default value is aes-256-cbc
    * @property {string} input_encoding - how encryption input is encoded. Used as output for decrypting. Default utf-8.
    * @property {string} output_encoding - how encryption output is encoded. Used as input for decrypting. Default hex.
    */
    encryption: {},

    /**
    * Specifies where to store files. Value "fs" means file system or basically storing files on hard drive. Another currently supported option is "gridfs" storing files in MongoDB database using GridFS. By default fallback to "fs";
    * @type {string} [default=fs]
    */
    fileStorage: "fs",
    /**
    *Specifies after how long time configurations are reloded from data base. Default value is 10000 (10 seconds)
    * @type {integer} [default=10000]
    **/
    reloadConfigAfter: 10000
};

// Set your host IP or domain to be used in the emails sent
countlyConfig.host = "analytics.yinxiang.com";
countlyConfig.domain = "https://analytics.yinxiang.com";

module.exports = require('./configextender')('API', countlyConfig, process.env);
