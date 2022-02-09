class Sensor {
    constructor(id) {
        this.id = id;
        this.powerStatus = 'off';
        this.status = 'off';
        this.reportingInterval = 10000;
    }

    turn(command) {
        if (this.powerStatus === 'on' && command === 'on') {
            // 전원 켜고 끔, 이미 켜있는 전원이면 또 켤 수 없음
            throw new Error(); // Error은 객체로 보내주어야 한다.
        } else {
            this.powerStatus = command;
        }

        if (this.powerStatus === 'on') {
            // 기기가 켜지는 즉시 유휴 상태로 들어간다.
            this.status = 'idle';
            setTimeout(() => {
                this.status = 'sensingDistance';
            }, this.reportingInterval);
            setTimeout(() => {
                this.status = 'reportingData';
            }, this.reportingInterval + 500);
            setTimeout(() => {
                this.status = 'idle';
            }, this.reportingInterval + 500 + 1000);
        }
    }
}

class IotServer {
    constructor() {
        this.sensor = [];
    }

    start([sensor]) {
        this.sensor = sensor;
        console.log(this);
        console.log(this.sensor);
    }

    publish({ deviceId, actionId, payload }) {
        if (this.sensor.powerStatus !== 'off') {
            if (this.sensor.id === deviceId && actionId) {
                this.sensor.reportingInterval = payload;
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
