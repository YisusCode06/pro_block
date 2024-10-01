// controllers/contracts.controller.js
import { TezosToolkit } from "@taquito/taquito";

// Configura la instancia de Tezos Toolkit para interactuar con la blockchain Tezos
const tezos = new TezosToolkit('https://mainnet-tezos.giganode.io'); // O el nodo que estés utilizando

// Función para desplegar un contrato inteligente
export const deployContract = async (req, res) => {
  try {
    const { contractCode, initStorage, senderPrivateKey } = req.body;

    // Configurar clave privada del remitente (wallet)
    tezos.setProvider({ signer: await importKey(tezos, senderPrivateKey) });

    // Desplegar el contrato
    const operation = await tezos.contract.originate({
      code: contractCode,
      storage: initStorage,
    });

    await operation.confirmation();
    const contractAddress = operation.contractAddress;

    res.status(201).json({ message: 'Contrato desplegado con éxito', contractAddress });
  } catch (error) {
    res.status(500).json({ message: 'Error al desplegar el contrato', error });
  }
};

// Función para invocar una transacción en un contrato
export const invokeContract = async (req, res) => {
  try {
    const { contractAddress, method, params, senderPrivateKey } = req.body;

    // Configurar clave privada del remitente (wallet)
    tezos.setProvider({ signer: await importKey(tezos, senderPrivateKey) });

    // Obtener el contrato
    const contract = await tezos.contract.at(contractAddress);

    // Llamar a un método del contrato
    const operation = await contract.methods[method](...params).send();

    await operation.confirmation();
    res.status(200).json({ message: 'Transacción ejecutada con éxito', operationHash: operation.hash });
  } catch (error) {
    res.status(500).json({ message: 'Error al invocar el contrato', error });
  }
};

// Función para consultar el estado de un contrato
export const getContractStorage = async (req, res) => {
  try {
    const { contractAddress } = req.params;

    // Obtener el contrato
    const contract = await tezos.contract.at(contractAddress);

    // Obtener el almacenamiento del contrato
    const storage = await contract.storage();
    res.status(200).json(storage);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el estado del contrato', error });
  }
};
