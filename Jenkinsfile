pipeline {
    agent { docker { image 'node:10.10.0' } }
    stages {
        stage('build') {
            steps {
                git 'https://github.com/Gidraff/cheat-sheet-api.git'
            }
        },
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        },
        stage('test') {
            steps {
                sh 'npm test'
            }
        }
    }
}
