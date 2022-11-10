pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/vihsilvadacosta/testes-e2e-ebac-shop.git'
            }
        }
    }
     stages {
        stage('Instalar dependencias') {
            steps {
               sh 'npm install'
            }
        }
    }
     stages {
        stage('Executar testes') {
            steps {
                sh 'npm cy:run'
            }
        }
    }
}