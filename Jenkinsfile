pipeline {
    agent { docker { image 'node:10.10.0' } }
    stages {
        stage('Clone repo') {
            steps {
                git 'https://github.com/Gidraff/cheat-sheet-api'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
