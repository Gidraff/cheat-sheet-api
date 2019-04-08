pipeline {
    agent { docker {
        image 'node:10.10.0'
        args '-u root:root'
        } }
    parameters {
        string(defaultValue: "develop", description: "Branch Specifier", name: "SPECIFIER")
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.SPECIFIER}", url: 'https://github.com/Gidraff/cheat-sheet-api.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install -g npm@latest'
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

