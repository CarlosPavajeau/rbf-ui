export interface InitRbf {
  num_inputs: number;
  radial_centers: number;
}

export interface FitRbf {
  inputs: number[][];
  outputs: number[];
  tolerance: number;
  epochs: number;
}

export interface EvalRbf {
  inputs: number[];
}

export interface RadialCenterResponse {
  num_inputs: number;
  centroids: number[];
}

export interface NodeResponse {
  num_inputs: number;
  weights: number[];
  bias: number;
}

export interface RbfResponse {
  num_inputs: number;
  radial_centers: RadialCenterResponse[];
  output_node: NodeResponse;
  errors: number[];
}
