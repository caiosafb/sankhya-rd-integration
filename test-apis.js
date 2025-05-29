const axios = require('axios');

const config = {
  sankhya: {
    baseUrl: 'https://api.sankhya.com.br/gateway/v1',
    token: '6d2ce413-e7ac-4675-b3d9-5335388a2b5d',
    apiKey: '3cc339ed-92b6-48c3-bce2-bd6d1a5e8a91',
    username: 'tecnologia@golev.com.br',
    password: 'Administr@tor1'
  },
  rdStation: {
    baseUrl: 'https://api.rd.services',
    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yZC5zZXJ2aWNlcyIsInN1YiI6IjNSOXIzTUJkYTNPTVhrenBUZzJkandWbUNNVzlhMFdwaU5PenpoclV4MTRAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBwLnJkc3RhdGlvbi5jb20uYnIvYXBpL3YyLyIsImFwcF9uYW1lIjoiQXBwLVRpIiwiZXhwIjoxNzQ2NjI3MDc3LCJpYXQiOjE3NDY1NDA2NzcsInNjb3BlIjoiIn0.PVHYdekweAsbSsyce5CCBGUr_YIBJ4q_5OF3capTbM5Wb7wN3GXGkjsZD2iwPDZ8u8A65KLQipzGOZpzmcXSGSdrEsfs5MaaHbtj1Ituk1b04JpHloPEY0-LUAPTf_bX8th8h3FHp78slCsDcFeuDQ6iso2pihMet4hACQGjlh4K73PUGVbV0dpCVNLSvjZ8fMPs2o_gx4QuVApfC4yylYCWYZoUkVT3uHtZUUIUSX8A0PBZM4JUWf9gK2o2McN65gj-AkdgH-yl7XuQJV9h_lJlmmjM66A_XJ-cm59GbDYvQexJ9DQDlWqzfd04ZMui1nFSdZ48cPzVs5yPiJXCeA'
  }
};

async function testSankhya() {
  console.log('Testando Sankhya...');
  try {
    const response = await axios.post(
      `${config.sankhya.baseUrl}/service.sbr`,
      {
        serviceName: 'MobileLoginSP.login',
        requestBody: {
          NOMUSU: config.sankhya.username,
          INTERNO: config.sankhya.password
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${config.sankhya.token}`,
          'token': config.sankhya.apiKey,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.responseBody?.jsessionid) {
      console.log('Sankhya: Autenticação bem sucedida!');
      console.log('Session ID:', response.data.responseBody.jsessionid);
      return response.data.responseBody.jsessionid;
    }
  } catch (error) {
    console.error('Sankhya: Erro na autenticação');
    console.error('Detalhes:', error.response?.data || error.message);
  }
}

async function testRDStation() {
  console.log('Testando RD Station...');
  try {
    const response = await axios.get(
      `${config.rdStation.baseUrl}/platform/contacts?limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${config.rdStation.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('RD Station: Conexão bem sucedida!');
    console.log('Total de contatos:', response.data.total);
  } catch (error) {
    console.error('RD Station: Erro na conexão');
    console.error('Status:', error.response?.status);
    console.error('Detalhes:', error.response?.data || error.message);
  }
}

async function runTests() {
  console.log('Iniciando testes de conexão...');
  await testSankhya();
  await testRDStation();
  console.log('Testes concluídos!');
}

runTests();