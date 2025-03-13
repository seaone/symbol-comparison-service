import { image, LayersModel, loadLayersModel, node, Tensor } from '@tensorflow/tfjs-node';
import * as path from 'path';
import { SymbolComparatorPort } from '../core/ports/symbol-comparator-port.js';
import { TensorflowSymbolComparatorError } from './errors/tensorflow-symbol-comparator-error.js';

interface TensorflowSymbolComparatorConfig {
  modelPath?: string;
  tensorSize?: [number, number];
}

const DEFAULT_MODEL_PATH = path.join(process.cwd(), 'assets', 'siamese-network', 'model.json');
const DEFAULT_TENSOR_SIZE: [number, number] = [96, 96];

export class TensorflowSymbolComparator implements SymbolComparatorPort {
  private readonly modelPath: string;
  private readonly tensorSize: [number, number];
  private model: LayersModel | null = null;

  constructor(config: TensorflowSymbolComparatorConfig = {}) {
    this.modelPath = config.modelPath ?? DEFAULT_MODEL_PATH;
    this.tensorSize = config.tensorSize ?? DEFAULT_TENSOR_SIZE;
  }

  async compare(symbolData1: Buffer, symbolData2: Buffer): Promise<number> {
    try {
      const model = await this.getModel();
      const [tensor1, tensor2] = this.imageBuffersToTensors([symbolData1, symbolData2]);

      const prediction = model.predict([tensor1, tensor2]) as Tensor;
      const [result] = await prediction.data();

      tensor1.dispose();
      tensor2.dispose();
      prediction.dispose();

      return result;
    } catch (error) {
      throw new TensorflowSymbolComparatorError('Comparison failed', { cause: error });
    }
  }

  private async getModel(): Promise<LayersModel> {
    if (!this.model) {
      this.model = await loadLayersModel(`file://${this.modelPath}`);
    }

    return this.model;
  }

  private imageBuffersToTensors(imageBuffers: Buffer[]): Tensor[] {
    const channels = 1;
    const size = this.tensorSize;

    return imageBuffers.map((buffer) => {
      const tensor = node.decodeImage(new Uint8Array(buffer), channels);
      const resizedTensor = image.resizeBilinear(tensor, size);
      const reshapedTensor = resizedTensor.reshape([...size]);
      const batchedTensor = reshapedTensor.expandDims(0);

      tensor.dispose();
      resizedTensor.dispose();
      reshapedTensor.dispose();

      return batchedTensor;
    });
  }
}
