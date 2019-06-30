/**
 * Redis client
 */
var rds = require("redis");

var redis = {},
    common = require('./common.js');

var host = common.config.redis.host,
    port = common.config.redis.port,
    instanceId = common.config.redis.instanceId,
    password = common.config.redis.pwd;

var redisClient;

// initialize redis client
function initRedis() {
    if (undefined == redisClient || null == redisClient) {
        redisClient = rds.createClient(port, host, {detect_buffers: true});
    }
}
initRedis(); //init
// build auth info
var auth = password;
if ('' !== instanceId && '' !== password) {
    auth = instanceId + ":" + password;
}
if (undefined != auth && '' !== auth) {
    redisClient.auth(auth);
}

// on connected
redisClient.on("connect", function() {
    common.log("Connected to Redis");
});

/**
 * 
 * @param {string} topic - topic of pub/sub
 * @param {string} content - content that want to be published
 */
redis.pub = function(topic, content) {
    initRedis();
    redisClient.publish(topic, content, function(err, result) {
        if (err) {
            console.log("Publishing to Redis got error: ", err);
            return false;
        }
    });
    return true;
};

redis.sub = function(topic, cb) {
    redisClient.subscribe(topic, function(err, reply) {
        common.log("Subscribed to topic: " + reply);
    });
    // on error event
    redisClient.on("error", function(err) {
        common.log("Invoke Redis get error: ", err);
    });
    // on message
    redisClient.on("message", function(channel, message) {
        cb(channel, message);
    });
};

module.exports = redis;
