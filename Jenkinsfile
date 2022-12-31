pipeline{
    agent any
    environment{
        DB_URL = credentials('MQTT_DATABASE_URL')
        MQTT_SERVER = credentials('MQTT_SERVER')
        MQTT_ID = credentials('MQTT_CLIENTID')
        MQTT_LOGIN = credentials('MQTT_LOGIN')

    }
    stages{
        stage('docker build'){
            steps{
                sh 'docker build -t kaconk17/mqtt_client:latest .'
            }
        }
        /*
        stage('destroy existing'){
            steps{
                sh 'docker rm -f mqtt_client'
            }
        }
        stage('deploy docker'){
            steps{
                sh 'docker run -e DATABASE_URL=DB_URL'
            }
        }
        */
    }
}