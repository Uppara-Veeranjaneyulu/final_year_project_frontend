/**
 * paperData.js
 * All data sourced directly from the research paper PDF:
 * "Reinforcement Learning-Based Optimization for Dynamic Task Scheduling
 *  and Resource Allocation: An Adaptive Reward Framework and a Multi-Agent Extension"
 * Amrita Vishwa Vidyapeetham, Coimbatore, 2024
 */

// ============================================================
// PAPER METADATA
// ============================================================
export const PAPER = {
  title: 'Reinforcement Learning-Based Optimization for Dynamic Task Scheduling and Resource Allocation',
  subtitle: 'An Adaptive Reward Framework and a Multi-Agent Extension',
  fullTitle: 'Reinforcement Learning-Based Optimization for Dynamic Task Scheduling and Resource Allocation: An Adaptive Reward Framework and a Multi-Agent Extension',
  keywords: [
    'Cloud Computing',
    'Reinforcement Learning',
    'Multi-Agent Reinforcement Learning',
    'Proximal Policy Optimization',
    'MAPPO',
    'Adaptive Reward Shaping',
    'Task Scheduling',
    'Resource Allocation',
    'Load Balancing',
    'Workload Forecasting',
    'SARIMAX',
    'Deep Learning',
    'Decentralized POMDP',
  ],
  journal: 'Journal of Cloud Computing (Springer)',
  doi: 'JCC-2024',
  pages: 28,
}

// ============================================================
// TEAM / AUTHORS
// ============================================================
export const TEAM = [
  {
    id: 1,
    name: 'Dr. Vandhana S',
    role: 'Project Guide',
    title: 'Assistant Professor',
    department: 'Department of Computer Science & Engineering',
    university: 'Amrita School of Computing, Amrita Vishwa Vidyapeetham, Coimbatore',
    email: 's_vandhana@cb.amrita.edu',
    regId: null,
    isGuide: true,
    contributions: ['Conceptualization', 'Supervision', 'Review & Editing'],
    avatar: 'VS',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 2,
    name: 'Balla Kumar Basavaraju',
    role: 'Team Member',
    title: 'B.Tech CSE Student',
    department: 'Amrita School of Computing',
    university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    email: 'cb.sc.u4cse23312@cb.students.amrita.edu',
    regId: 'CB.SC.U4CSE23312',
    isGuide: false,
    contributions: ['Methodology', 'Software', 'Simulation Environment', 'Formal Analysis', 'Investigation', 'Writing — Original Draft'],
    avatar: 'BK',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 3,
    name: 'Chappidi Kuladeep Reddy',
    role: 'Team Member',
    title: 'B.Tech CSE Student',
    department: 'Amrita School of Computing',
    university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    email: 'cb.sc.u4cse23313@cb.students.amrita.edu',
    regId: 'CB.SC.U4CSE23313',
    isGuide: false,
    contributions: ['Methodology', 'Software', 'Formal Analysis', 'Investigation', 'Writing — Original Draft'],
    avatar: 'CK',
    color: 'from-violet-500 to-violet-700',
  },
  {
    id: 4,
    name: 'Uppara Veeranjaneyulu',
    role: 'Team Member',
    title: 'B.Tech CSE Student',
    department: 'Amrita School of Computing',
    university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    email: 'cb.sc.u4cse23351@cb.students.amrita.edu',
    regId: 'CB.SC.U4CSE23351',
    isGuide: false,
    contributions: ['Software', 'Simulation Environment', 'Writing — Original Draft'],
    avatar: 'UV',
    color: 'from-sky-500 to-sky-700',
  },
  {
    id: 5,
    name: 'Vullam Teja',
    role: 'Team Member',
    title: 'B.Tech CSE Student',
    department: 'Amrita School of Computing',
    university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    email: 'cb.sc.u4cse23355@cb.students.amrita.edu',
    regId: 'CB.SC.U4CSE23355',
    isGuide: false,
    contributions: ['Software', 'Simulation Environment', 'Writing — Review & Editing'],
    avatar: 'VT',
    color: 'from-teal-500 to-teal-700',
  },
  {
    id: 6,
    name: 'Vejju Sasi Kiran Yasaswi',
    role: 'Team Member',
    title: 'B.Tech CSE Student',
    department: 'Amrita School of Computing',
    university: 'Amrita Vishwa Vidyapeetham, Coimbatore',
    email: 'cb.sc.u4cse23356@cb.students.amrita.edu',
    regId: 'CB.SC.U4CSE23356',
    isGuide: false,
    contributions: ['Software', 'Simulation Environment', 'Writing — Review & Editing'],
    avatar: 'VY',
    color: 'from-cyan-500 to-cyan-700',
  },
]

// ============================================================
// ABSTRACT (from paper Section 1)
// ============================================================
export const ABSTRACT = `Dynamic cloud computing environments experience significant variations in workload intensity, task characteristics, and resource demand. Traditional task scheduling and load balancing techniques such as Round Robin and Least Connections are primarily reactive and often fail to adapt effectively to sudden workload fluctuations and heterogeneous resource requirements. Accurate workload forecasting, combined with adaptive scheduling, can enable proactive resource allocation and improve system performance.

This paper presents a predictive reinforcement learning-based framework for dynamic task scheduling and resource allocation in heterogeneous cloud environments. Seven real-world workload datasets, including Google Cluster traces, Bitbrains, HPC2N, and scientific observation logs, were considered for workload analysis. Multiple forecasting approaches, including SARIMAX, persistence forecasting, GRU, LSTM, Bidirectional LSTM, Temporal Convolutional Networks, and Transformer encoders, were evaluated under identical preprocessing conditions using a 24-step input window, feature scaling, and an 80–20 chronological train-test split.

SARIMAX achieved the best forecasting performance with an RMSE of 0.0708 and an R² score of 0.270, outperforming the persistence baseline and all evaluated deep learning models, and was therefore selected as the forecasting backbone of the proposed framework. For scheduling, a single-agent Proximal Policy Optimization (PPO) scheduler using a fixed-weight reward function was implemented and evaluated against Round Robin, Least Connections, and Random scheduling, achieving the highest throughput and lowest request drop rate among the four policies at the cost of higher CPU utilization and latency.

Building on this baseline, the paper introduces two architectural extensions: (i) an Adaptive Dynamic Reward System, in which a centralized AdaptiveRewardManager automatically re-weights the reward function once per episode based on observed violations of target service objectives; and (ii) a Multi-Agent Reinforcement Learning (MARL) formulation as a decentralized partially observable Markov decision process (Dec-POMDP), in which each server is modelled as an autonomous agent trained using Multi-Agent PPO (MAPPO) with a centralized critic and decentralized execution.`

// ============================================================
// RESEARCH CONTRIBUTIONS (from Section 1)
// ============================================================
export const CONTRIBUTIONS = [
  'Evaluation of seven real-world cloud and scientific workload datasets for dynamic workload modelling.',
  'Comparative evaluation of SARIMAX, persistence forecasting, GRU, LSTM, Bidirectional LSTM, Temporal Convolutional Networks (TCN), and Transformer-based forecasting.',
  'Identification and analysis of temporal regime shift as a major factor affecting neural workload forecasting performance.',
  'Selection of SARIMAX as the forecasting backbone based on controlled experimental evaluation.',
  'Development of a heterogeneous cloud simulation environment for dynamic task scheduling and resource allocation.',
  'Implementation and evaluation of a single-agent PPO scheduler with a fixed reward function, compared against Round Robin, Least Connections, and Random scheduling.',
  'Design of an Adaptive Dynamic Reward System (AdaptiveRewardManager) that automatically re-weights reward coefficients once per episode based on normalized violations of target service objectives.',
  'A complete Dec-POMDP formulation of the scheduling problem as a Multi-Agent Reinforcement Learning task, with each server as an autonomous agent trained using MAPPO under the CTDE paradigm.',
  'A reward-sharing design in which a single global AdaptiveRewardManager broadcasts one adaptive weight vector per episode to every agent, preserving global priority while keeping reward computation decentralized.',
]

// ============================================================
// DATASETS (from Sections 4.1–4.7)
// ============================================================
export const DATASETS = [
  {
    id: 'google-cluster-v1',
    name: 'Google Cluster Workload Trace',
    shortName: 'Google Cluster v1',
    category: 'Cloud',
    description: 'Large-scale measurements collected from production computing clusters. Contains task events and resource utilization measurements including CPU and memory consumption. Widely used for evaluating cloud resource management and workload prediction algorithms.',
    metrics: { CPU: true, Memory: true, GPU: false, Network: false },
    features: ['CPU utilization', 'Memory utilization', 'Task events', 'Resource usage'],
    targetVariable: 'CPU utilization (normalized)',
    source: 'Google Production Cluster',
    type: 'Cloud Trace',
    badge: 'cloud',
    color: 'blue',
    size: 'Large',
    frequency: 'Variable',
    usedIn: 'Workload forecasting evaluation',
  },
  {
    id: 'google-cluster-v2',
    name: 'Google Cluster Trace Version 2.1',
    shortName: 'Google Cluster v2.1',
    category: 'Cloud',
    description: 'Contains workload information from a large Google production cluster with detailed task and machine events. Represents realistic variations in large-scale data-center workloads.',
    metrics: { CPU: true, Memory: true, GPU: false, Network: false },
    features: ['CPU utilization', 'Memory utilization', 'Task events', 'Machine events', 'Priority info'],
    targetVariable: 'CPU utilization (normalized)',
    source: 'Google Production Cluster v2.1',
    type: 'Cloud Trace',
    badge: 'cloud',
    color: 'blue',
    size: 'Very Large',
    frequency: 'Fine-grained',
    usedIn: 'Workload forecasting evaluation',
  },
  {
    id: 'bitbrains',
    name: 'Bitbrains GWA-T-12',
    shortName: 'Bitbrains',
    category: 'Cloud',
    description: 'Resource utilization measurements from virtual machines running in a distributed data center. Provides comprehensive metrics including CPU utilization, memory utilization, disk activity, and network usage.',
    metrics: { CPU: true, Memory: true, GPU: false, Network: true },
    features: ['CPU utilization', 'Memory utilization', 'Disk I/O', 'Network usage', 'VM-level metrics'],
    targetVariable: 'CPU utilization (normalized)',
    source: 'Bitbrains Data Center (GWA Archive)',
    type: 'VM Trace',
    badge: 'cloud',
    color: 'indigo',
    size: 'Medium',
    frequency: '5-minute intervals',
    usedIn: 'Workload forecasting evaluation',
  },
  {
    id: 'spitzer',
    name: 'Spitzer Space Telescope Dataset',
    shortName: 'Spitzer',
    category: 'Scientific',
    description: 'Scientific observation scheduling records from the Spitzer Space Telescope. Used as temporal workload traces to study irregular and burst-oriented task arrival behaviour.',
    metrics: { CPU: false, Memory: false, GPU: false, Network: false },
    features: ['Observation scheduling records', 'Task arrival patterns', 'Burst events', 'Temporal irregularity'],
    targetVariable: 'Observation task arrival rate',
    source: 'NASA Spitzer Science Center',
    type: 'Scientific Observation Log',
    badge: 'scientific',
    color: 'violet',
    size: 'Medium',
    frequency: 'Mission-based',
    usedIn: 'Irregular workload pattern study',
  },
  {
    id: 'xmm-newton',
    name: 'XMM-Newton Observation Dataset',
    shortName: 'XMM-Newton',
    category: 'Scientific',
    description: 'Scheduled scientific observations and mission activity records from the XMM-Newton X-ray telescope. Provides additional workload patterns with temporal irregularity.',
    metrics: { CPU: false, Memory: false, GPU: false, Network: false },
    features: ['Scheduled observations', 'Mission activity records', 'Temporal patterns', 'Irregularity'],
    targetVariable: 'Observation task arrival rate',
    source: 'ESA XMM-Newton Science Archive',
    type: 'Scientific Observation Log',
    badge: 'scientific',
    color: 'purple',
    size: 'Small-Medium',
    frequency: 'Mission-based',
    usedIn: 'Irregular workload pattern study',
  },
  {
    id: 'parallel-workloads',
    name: 'Parallel Workloads Archive',
    shortName: 'PWA',
    category: 'HPC',
    description: 'Workload logs from high-performance computing systems. Contains information about job submission and execution behaviour. Commonly used for evaluating job scheduling algorithms.',
    metrics: { CPU: true, Memory: false, GPU: false, Network: false },
    features: ['Job submission times', 'Execution behaviour', 'Wait times', 'Job sizes', 'User IDs'],
    targetVariable: 'Job arrival rate',
    source: 'Parallel Workloads Archive (PWA)',
    type: 'HPC Job Log',
    badge: 'hpc',
    color: 'emerald',
    size: 'Large',
    frequency: 'Job-based',
    usedIn: 'HPC scheduling evaluation',
  },
  {
    id: 'hpc2n',
    name: 'HPC2N Workload Dataset',
    shortName: 'HPC2N',
    category: 'HPC',
    description: 'Part of the Parallel Workloads Archive. Job execution traces from a high-performance computing environment representing realistic task-arrival and execution patterns. Used for detailed workload analysis.',
    metrics: { CPU: true, Memory: false, GPU: false, Network: false },
    features: ['Job arrival patterns', 'Execution traces', 'Task characteristics', 'Queue behaviour'],
    targetVariable: 'CPU demand (normalized)',
    source: 'HPC2N (High Performance Computing Center North)',
    type: 'HPC Job Log',
    badge: 'hpc',
    color: 'teal',
    size: 'Medium',
    frequency: 'Job-based',
    usedIn: 'Detailed workload analysis',
  },
]

// ============================================================
// SPRINGER EXPERIMENTAL PROTOCOL & DATASET TABLES (Springer Revision)
// ============================================================
export const SPRINGER_TABLE_1 = [
  { dataset: 'Alibaba Cluster Trace (2018)', domain: 'Cloud Microservices', source: 'Alibaba (GitHub: alibaba/clusterdata)', timeSpan: '8 Days (2018)', resolution: '10s–1min task logs', samples: '~1.3M Tasks (10k Machines)', purpose: 'RL environment workload & task arrival simulator' },
  { dataset: 'Azure Public Dataset (2017)', domain: 'Enterprise Cloud VMs', source: 'Microsoft Azure (GitHub: Azure/AzurePublicDataset)', timeSpan: '30 Days (2017)', resolution: '5-minute intervals', samples: '~2.6M VM Traces', purpose: 'Cross-domain forecasting & transferability benchmark' },
  { dataset: 'CAIDA Internet Traffic (2025)', domain: 'Network Traffic', source: 'CAIDA Passive PCAP (100G link)', timeSpan: '1 Hour Capture', resolution: 'Packet timestamp / 1s bin', samples: '~100M Packets (100G)', purpose: 'External stress-testing under network I/O burstiness' },
  { dataset: 'Google Cluster Workload (v1)', domain: 'Production Compute', source: 'Google (GitHub: google/cluster-data)', timeSpan: '29 Days (May 2011)', resolution: '5-minute usage windows', samples: '~670,000 Tasks (12.5k Machines)', purpose: 'Primary workload forecasting & PPO RL baseline' },
  { dataset: 'Google Cluster Trace v2.1', domain: 'Multi-Cell Cloud', source: 'Google Storage (clusterdata-2011-2)', timeSpan: '31 Days (8 Cells)', resolution: '5-minute usage windows', samples: '~2.4M Tasks across 8 cells', purpose: 'Forecasting evaluation under temporal regime shift' },
  { dataset: 'Bitbrains Cloud (GWA-T-12)', domain: 'Commercial VM Data Center', source: 'Bitbrains (Grid Workloads Archive)', timeSpan: '30 Days (RND & FastStorage)', resolution: '5-minute sampling interval', samples: '1,750 VMs (~15M usage points)', purpose: 'Multi-resource (CPU & RAM) forecasting benchmark' },
  { dataset: 'Spitzer Space Telescope Logs', domain: 'Astronomical Observatory', source: 'NASA IRSA / Spitzer Science Center', timeSpan: '16+ Years (2003–2019)', resolution: 'Event observation logs', samples: '~140,000 Observation Records', purpose: 'Benchmark non-stationary, irregular observation bursts' },
  { dataset: 'XMM-Newton Observation Logs', domain: 'Space-Based Observatory', source: 'ESA XMM-Newton Science Archive', timeSpan: '24+ Years (1999–2024)', resolution: 'Variable observation timestamps', samples: '~55,000 Scheduled Observations', purpose: 'Benchmark irregular long-duration scientific batch jobs' },
  { dataset: 'Parallel Workloads Archive (PWA)', domain: 'High-Performance Computing', source: 'HUJI Parallel Workloads Archive', timeSpan: 'Multi-year logs', resolution: 'Per-job event logs', samples: '~500,000 Jobs across traces', purpose: 'HPC queueing & job scheduling baseline benchmark' },
  { dataset: 'HPC2N Workload Dataset', domain: 'Supercomputing Center', source: 'HPC2N / Parallel Workloads Archive', timeSpan: '3.5 Years (2002–2006)', resolution: 'Job timestamps', samples: '527,371 Batch Jobs', purpose: 'RL scheduler evaluation under HPC workload characteristics' },
]

export const SPRINGER_TABLE_2 = [
  { dataset: 'Alibaba Cluster Trace (2018)', forecasting: 'No', rlTraining: 'Yes', rlEvaluation: 'Yes', benchmarkOnly: 'No', externalVal: 'No', merged: 'No', purpose: 'Simulate task arrival & resource request distributions in RL environment' },
  { dataset: 'Azure Public Dataset (2017)', forecasting: 'Yes', rlTraining: 'No', rlEvaluation: 'Yes', benchmarkOnly: 'No', externalVal: 'Yes', merged: 'No', purpose: 'Evaluate forecasting generalization & cross-domain RL transfer' },
  { dataset: 'CAIDA Internet Traffic (2025)', forecasting: 'No', rlTraining: 'No', rlEvaluation: 'No', benchmarkOnly: 'No', externalVal: 'Yes', merged: 'No', purpose: 'Stress-test RL scheduler network I/O component under extreme packet bursts' },
  { dataset: 'Google Cluster Workload (v1)', forecasting: 'Yes', rlTraining: 'Yes', rlEvaluation: 'Yes', benchmarkOnly: 'No', externalVal: 'No', merged: 'No', purpose: 'Primary training corpus for SARIMAX forecaster & single-agent PPO baseline' },
  { dataset: 'Google Cluster Trace v2.1', forecasting: 'Yes', rlTraining: 'No', rlEvaluation: 'Yes', benchmarkOnly: 'No', externalVal: 'No', merged: 'No', purpose: 'Evaluate forecaster resilience under multi-cell temporal regime shifts' },
  { dataset: 'Bitbrains Cloud (GWA-T-12)', forecasting: 'Yes', rlTraining: 'No', rlEvaluation: 'Yes', benchmarkOnly: 'No', externalVal: 'No', merged: 'No', purpose: 'Multi-resource (CPU, Memory, Disk) joint workload forecasting' },
  { dataset: 'Spitzer Space Telescope Logs', forecasting: 'No', rlTraining: 'No', rlEvaluation: 'No', benchmarkOnly: 'Yes', externalVal: 'No', merged: 'No', purpose: 'Benchmark arrival rate forecasters on highly irregular event bursts' },
  { dataset: 'XMM-Newton Observation Logs', forecasting: 'No', rlTraining: 'No', rlEvaluation: 'No', benchmarkOnly: 'Yes', externalVal: 'No', merged: 'No', purpose: 'Benchmark non-Poisson scientific batch job execution profiles' },
  { dataset: 'Parallel Workloads Archive (PWA)', forecasting: 'No', rlTraining: 'No', rlEvaluation: 'Yes', benchmarkOnly: 'Yes', externalVal: 'No', merged: 'No', purpose: 'Evaluate scheduler wait-time optimization on HPC job traces' },
  { dataset: 'HPC2N Workload Dataset', forecasting: 'No', rlTraining: 'No', rlEvaluation: 'Yes', benchmarkOnly: 'Yes', externalVal: 'No', merged: 'No', purpose: 'Evaluate RL resource allocation policies under supercomputing queue patterns' },
]

export const SPRINGER_TABLE_3 = [
  { dataset: 'Alibaba Cluster Trace', cleaning: 'Filter incomplete task events & negative durations', missing: 'Forward fill machine states', featureEng: 'Task CPU/RAM ratio, priority class', norm: 'Min-Max [0,1]', resampling: '1-min aggregation', train: '70%', val: '10%', test: '20%' },
  { dataset: 'Azure Public Dataset', cleaning: 'Remove inactive VMs (<5 min uptime)', missing: 'Linear Interpolation', featureEng: 'Rolling 12-step mean & max CPU/RAM', norm: 'Z-Score Standard', resampling: '5-min fixed grid', train: '80%', val: '0%', test: '20%' },
  { dataset: 'CAIDA Internet Traffic', cleaning: 'Drop corrupted PCAP headers & non-IP', missing: 'Zero Fill for silent seconds', featureEng: 'Packet arrival rate, throughput, burst factor', norm: 'Log & Min-Max', resampling: '1-sec binning', train: '0%', val: '0%', test: '100%' },
  { dataset: 'Google Cluster Workload (v1)', cleaning: 'Exclude unmapped task IDs & system daemons', missing: 'Cubic Spline Interp', featureEng: '24-step sliding window, CPU/RAM delta', norm: 'Min-Max [0,1]', resampling: '5-min mean agg', train: '80%', val: '0%', test: '20%' },
  { dataset: 'Google Cluster Trace v2.1', cleaning: 'Remove cell maintenance windows', missing: 'Forward Fill', featureEng: 'Cell-level aggregate CPU demand & variance', norm: 'Min-Max [0,1]', resampling: '5-min aggregation', train: '80%', val: '0%', test: '20%' },
  { dataset: 'Bitbrains (GWA-T-12)', cleaning: 'Filter VM startup spikes (<30s)', missing: 'Linear Interpolation', featureEng: 'CPU, Memory, Network I/O, Disk I/O', norm: 'Z-Score Standard', resampling: '5-min mean agg', train: '80%', val: '0%', test: '20%' },
  { dataset: 'Spitzer Observation Logs', cleaning: 'Filter calibration & test observations', missing: 'Omit unscheduled gaps', featureEng: 'Inter-arrival duration, instrument type ID', norm: 'Log-normalization', resampling: 'Event time-delta', train: 'N/A', val: 'N/A', test: '100%' },
  { dataset: 'XMM-Newton Logs', cleaning: 'Remove aborted observation exposures', missing: 'Omit inactive orbits', featureEng: 'Target exposure time, pointings per orbit', norm: 'Min-Max [0,1]', resampling: 'Event time-delta', train: 'N/A', val: 'N/A', test: '100%' },
  { dataset: 'Parallel Workloads Archive', cleaning: 'Remove unassigned node jobs', missing: 'Drop incomplete records', featureEng: 'Requested walltime, node count, submit hour', norm: 'Min-Max [0,1]', resampling: 'Job index mapping', train: 'N/A', val: 'N/A', test: '100%' },
  { dataset: 'HPC2N Workload Dataset', cleaning: 'Filter administrative test jobs', missing: 'Forward fill queues', featureEng: 'Queue wait time, processor count, walltime', norm: 'Min-Max [0,1]', resampling: 'Job index mapping', train: 'N/A', val: 'N/A', test: '100%' },
]

// ============================================================
// FORECASTING MODELS & RESULTS (Table 1 from paper)
// ============================================================
export const FORECASTING_RESULTS = [
  { model: 'SARIMAX',             mae: 0.0248, rmse: 0.0708, r2:    0.270, isWinner: true,  type: 'Statistical' },
  { model: 'Naive Persistence',   mae: 0.0196, rmse: 0.0789, r2:    0.092, isWinner: false, type: 'Baseline'    },
  { model: 'GRU',                 mae: 0.2000, rmse: 0.2352, r2:   -7.06,  isWinner: false, type: 'Deep Learning'},
  { model: 'LSTM',                mae: 0.4806, rmse: 0.4981, r2:  -35.15,  isWinner: false, type: 'Deep Learning'},
  { model: 'TCN',                 mae: 0.7047, rmse: 0.7419, r2:  -79.19,  isWinner: false, type: 'Deep Learning'},
  { model: 'Bidirectional LSTM',  mae: 0.7683, rmse: 0.8043, r2:  -93.25,  isWinner: false, type: 'Deep Learning'},
  { model: 'Transformer Encoder', mae: 2.0538, rmse: 2.1734, r2: -687.23,  isWinner: false, type: 'Deep Learning'},
]

// ============================================================
// SERVER CONFIGURATIONS (Table 2 from paper)
// ============================================================
export const SERVER_CONFIGS = [
  { type: 'Compute Optimized', cpu: 2.0, ram: 0.5, gpu: false, io: 0.5 },
  { type: 'Memory Optimized',  cpu: 0.5, ram: 2.0, gpu: false, io: 0.5 },
  { type: 'GPU Server',        cpu: 1.0, ram: 1.0, gpu: true,  io: 0.5 },
  { type: 'Storage Server',    cpu: 0.5, ram: 0.5, gpu: false, io: 2.0 },
  { type: 'General Purpose',   cpu: 1.0, ram: 1.0, gpu: false, io: 1.0 },
  { type: 'Low Power',         cpu: 0.4, ram: 0.4, gpu: false, io: 0.4 },
]

// ============================================================
// TASK CATEGORIES (Table 3 from paper)
// ============================================================
export const TASK_CATEGORIES = [
  { task: 'Video Encoding', cpu: 0.6, ram: 0.3, gpu: false, io: 0.1, duration: 30 },
  { task: 'AI Inference',   cpu: 0.3, ram: 0.3, gpu: true,  io: 0.1, duration: 15 },
  { task: 'SQL Analytics',  cpu: 0.1, ram: 0.6, gpu: false, io: 0.3, duration: 12 },
  { task: 'File Backup',    cpu: 0.1, ram: 0.1, gpu: false, io: 0.6, duration: 20 },
  { task: 'Web API',        cpu: 0.2, ram: 0.1, gpu: false, io: 0.1, duration:  2 },
]

// ============================================================
// SCHEDULING RESULTS (Table 6 from paper, Section 15)
// ============================================================
export const SCHEDULING_RESULTS = [
  {
    scheduler: 'PPO (Ours)',
    throughput: 0.590,
    dropRate: 41.00,
    cpuUtil: 'High',
    latency: 'High',
    loadVariance: 'Medium',
    isProposed: true,
    color: '#2563eb',
  },
  {
    scheduler: 'Least Connections',
    throughput: 0.467,
    dropRate: null, // (higher than PPO)
    cpuUtil: 'Medium',
    latency: 'Low',
    loadVariance: 'Low',
    isProposed: false,
    color: '#64748b',
  },
  {
    scheduler: 'Round Robin',
    throughput: 0.463,
    dropRate: null,
    cpuUtil: 'Medium',
    latency: 'Medium',
    loadVariance: 'Medium',
    isProposed: false,
    color: '#94a3b8',
  },
  {
    scheduler: 'Random',
    throughput: 0.451,
    dropRate: null,
    cpuUtil: 'Low',
    latency: 'High',
    loadVariance: 'High',
    isProposed: false,
    color: '#cbd5e1',
  },
]

// ============================================================
// PPO TRAINING CONFIG (Table 5 from paper)
// ============================================================
export const PPO_CONFIG = {
  algorithm: 'PPO',
  policy: 'MLP Policy',
  learningRate: '3 × 10⁻⁴',
  stepsPerUpdate: 1024,
  batchSize: 256,
  discountFactor: 0.99,
  episodeLength: 300,
  library: 'Stable-Baselines3',
  environment: 'Gymnasium',
}

// ============================================================
// MAPPO TRAINING CONFIG (Table 4 from paper)
// ============================================================
export const MAPPO_CONFIG = {
  algorithm: 'MAPPO (CTDE)',
  actorPolicy: 'Shared MLP Policy (parameter-shared)',
  critic: 'Centralized MLP Critic',
  numAgents: 'N = Number of Servers',
  learningRateActor: '3 × 10⁻⁴',
  learningRateCritic: '5 × 10⁻⁴',
  stepsPerUpdate: '1024 per agent',
  batchSize: 256,
  discountFactor: 0.99,
  episodeLength: 300,
  rewardSharing: 'Global AdaptiveRewardManager, local application',
  status: 'Architecture Specified — Empirical Evaluation Pending',
}

// ============================================================
// RL MODELS (paper + general)
// ============================================================
export const RL_MODELS = [
  {
    id: 'ppo',
    name: 'Proximal Policy Optimization (PPO)',
    acronym: 'PPO',
    category: 'Policy Gradient',
    status: 'implemented',
    statusLabel: 'Implemented & Evaluated',
    description: 'PPO provides stable policy updates while limiting excessively large changes to the learned policy using a clipped objective. Selected as the RL algorithm for the single-agent baseline because of its stability and natural extension to MAPPO.',
    equation: 'L^CLIP(θ) = E[min(r_t(θ)Â_t, clip(r_t(θ), 1−ε, 1+ε)Â_t)]',
    advantages: ['Stable training via clipped objective', 'Sample efficient', 'Works well with continuous & discrete actions', 'Natural extension to MAPPO'],
    disadvantages: ['Higher CPU/latency in our experiments', 'Fixed reward coefficients require manual tuning'],
    hyperparameters: PPO_CONFIG,
    results: { throughput: 0.590, dropRate: '41.00% (Lowest)', note: 'Highest throughput among all schedulers' },
  },
  {
    id: 'mappo',
    name: 'Multi-Agent PPO (MAPPO)',
    acronym: 'MAPPO',
    category: 'Multi-Agent RL',
    status: 'specified',
    statusLabel: 'Architecture Specified — Pending Evaluation',
    description: 'MAPPO extends PPO to multi-agent settings under the CTDE paradigm. Each server is an autonomous agent with a shared actor and centralized critic. The AdaptiveRewardManager broadcasts a shared weight vector to all agents.',
    equation: 'L^CLIP_i(θ_i) = E[min(r_{i,t}(θ_i)Â_{i,t}, clip(r_{i,t}(θ_i), 1−ε, 1+ε)Â_{i,t})]',
    advantages: ['Fixed observation size regardless of server count', 'Decentralized execution', 'Scalable — add/remove servers without retraining', 'Shared adaptive reward weight vector'],
    disadvantages: ['Not yet empirically evaluated', 'Training complexity higher than single-agent', 'Coordination overhead in forwarding actions'],
    hyperparameters: MAPPO_CONFIG,
    results: null, // Explicitly null — no results yet
  },
  {
    id: 'dqn',
    name: 'Deep Q-Network (DQN)',
    acronym: 'DQN',
    category: 'Value-Based',
    status: 'available',
    statusLabel: 'Available',
    description: 'DQN combines Q-learning with deep neural networks, using experience replay and target networks. Effective for discrete action spaces in cloud resource management.',
    advantages: ['Well-studied', 'Good for discrete actions', 'Experience replay improves sample efficiency'],
    disadvantages: ['Overestimation bias', 'Discrete actions only', 'Not selected — PPO outperforms in scheduling'],
    hyperparameters: null,
    results: null,
  },
  {
    id: 'a2c',
    name: 'Advantage Actor-Critic (A2C)',
    acronym: 'A2C',
    category: 'Actor-Critic',
    status: 'available',
    statusLabel: 'Available',
    description: 'A2C is a synchronous on-policy actor-critic algorithm that reduces variance using advantage estimation. Simpler than PPO but less stable.',
    advantages: ['Lower variance than REINFORCE', 'Simple implementation', 'Works with both discrete and continuous actions'],
    disadvantages: ['Less stable than PPO', 'Sensitive to hyperparameters', 'No clipping mechanism'],
    hyperparameters: null,
    results: null,
  },
  {
    id: 'ddpg',
    name: 'Deep Deterministic Policy Gradient (DDPG)',
    acronym: 'DDPG',
    category: 'Actor-Critic',
    status: 'available',
    statusLabel: 'Available',
    description: 'DDPG is an off-policy actor-critic algorithm for continuous action spaces. It uses experience replay and target networks similar to DQN.',
    advantages: ['Continuous action spaces', 'Off-policy (sample efficient)', 'Deterministic policy'],
    disadvantages: ['Training instability', 'Sensitive to hyperparameters', 'Not suitable for discrete scheduling actions'],
    hyperparameters: null,
    results: null,
  },
  {
    id: 'sac',
    name: 'Soft Actor-Critic (SAC)',
    acronym: 'SAC',
    category: 'Actor-Critic',
    status: 'available',
    statusLabel: 'Available',
    description: 'SAC maximizes both expected reward and policy entropy, leading to more exploratory and robust policies. State-of-the-art for continuous control tasks.',
    advantages: ['Entropy regularization encourages exploration', 'Very stable training', 'Sample efficient'],
    disadvantages: ['Continuous actions only', 'More complex than PPO', 'Harder to tune entropy temperature'],
    hyperparameters: null,
    results: null,
  },
]

// ============================================================
// ML MODELS
// ============================================================
export const ML_MODELS = [
  {
    id: 'sarimax',
    name: 'SARIMAX',
    fullName: 'Seasonal AutoRegressive Integrated Moving Average with eXogenous factors',
    category: 'Time Series / Statistical',
    status: 'winner',
    description: 'SARIMAX extends ARIMA by incorporating seasonal dependencies and optional external variables. Uses rolling one-step-ahead forecasting strategy, allowing the model state to incorporate the most recent observed workload.',
    equation: 'Φ_P(B^s)φ_p(B)(1−B)^d(1−B^s)^D y_t = Θ_Q(B^s)θ_q(B)ε_t',
    performance: { mae: 0.0248, rmse: 0.0708, r2: 0.270 },
    hyperparameters: ['p (AR order)', 'd (differencing)', 'q (MA order)', 'P, D, Q, s (seasonal components)', 'Window size: 24 steps'],
    advantages: ['Best RMSE in comparative study', 'Handles seasonality', 'Rolling update adapts quickly', 'No overfitting risk'],
    disadvantages: ['Assumes stationarity', 'Requires stationarity testing', 'Limited non-linear pattern capture'],
    selectedFor: 'Forecasting backbone of the proposed framework',
  },
  {
    id: 'lstm',
    name: 'LSTM',
    fullName: 'Long Short-Term Memory',
    category: 'Deep Learning',
    status: 'evaluated',
    description: 'LSTM networks use gated recurrent units to learn long-term temporal dependencies. Trained using sequences generated from the 24-step sliding window. Poor generalization under temporal regime shift.',
    performance: { mae: 0.4806, rmse: 0.4981, r2: -35.15 },
    hyperparameters: ['Hidden size', 'Layers', 'Dropout', 'Learning rate', 'Window: 24 steps', 'Train-test split: 80-20'],
    advantages: ['Captures long-term dependencies', 'Widely used for time series'],
    disadvantages: ['R² = −35.15 in study', 'Failed under temporal regime shift', 'Learned training distribution only'],
  },
  {
    id: 'gru',
    name: 'GRU',
    fullName: 'Gated Recurrent Unit',
    category: 'Deep Learning',
    status: 'evaluated',
    description: 'GRU is a simplified recurrent architecture using update and reset gates. Reduces architectural complexity compared with LSTM while retaining ability to model sequential dependencies.',
    performance: { mae: 0.2000, rmse: 0.2352, r2: -7.06 },
    hyperparameters: ['Hidden size', 'Layers', 'Dropout', 'Learning rate'],
    advantages: ['Fewer parameters than LSTM', 'Faster training'],
    disadvantages: ['R² = −7.06 in study', 'Failed generalization under regime shift'],
  },
  {
    id: 'bilstm',
    name: 'Bidirectional LSTM',
    fullName: 'Bidirectional Long Short-Term Memory',
    category: 'Deep Learning',
    status: 'evaluated',
    description: 'Bidirectional LSTM processes sequences in both forward and reverse directions during training, allowing the network to learn contextual relationships across the input window.',
    performance: { mae: 0.7683, rmse: 0.8043, r2: -93.25 },
    hyperparameters: ['Hidden size', 'Layers', 'Dropout', 'Learning rate'],
    advantages: ['Bidirectional context', 'Rich feature extraction'],
    disadvantages: ['R² = −93.25 in study', 'Worst among RNN variants in study'],
  },
  {
    id: 'tcn',
    name: 'TCN',
    fullName: 'Temporal Convolutional Network',
    category: 'Deep Learning',
    status: 'evaluated',
    description: 'TCN uses causal dilated convolutions to capture temporal dependencies over increasingly large receptive fields.',
    performance: { mae: 0.7047, rmse: 0.7419, r2: -79.19 },
    hyperparameters: ['Dilation factors', 'Kernel size', 'Channels', 'Dropout'],
    advantages: ['Parallelizable', 'Large receptive field with dilation'],
    disadvantages: ['R² = −79.19 in study', 'Poor generalization on shifted regime'],
  },
  {
    id: 'transformer',
    name: 'Transformer Encoder',
    fullName: 'Transformer Encoder (Attention-based)',
    category: 'Deep Learning',
    status: 'evaluated',
    description: 'A Transformer encoder was evaluated to determine whether attention-based sequence modelling could effectively learn workload patterns from available historical observations.',
    performance: { mae: 2.0538, rmse: 2.1734, r2: -687.23 },
    hyperparameters: ['Attention heads', 'Layers', 'd_model', 'FFN dim', 'Dropout'],
    advantages: ['Captures long-range dependencies via attention', 'Highly parallelizable'],
    disadvantages: ['R² = −687.23 — worst model in study', 'Severe overfitting to training regime', 'Not suitable for this workload type'],
  },
]

// ============================================================
// ADAPTIVE REWARD SYSTEM (Section 10)
// ============================================================
export const ADAPTIVE_REWARD = {
  targets: [
    { metric: 'Drop Rate',        target: '< 2%',          unit: '%' },
    { metric: 'Average Latency',  target: '< 50 ms',       unit: 'ms' },
    { metric: 'Queue Length',     target: '< 5 requests',  unit: 'req' },
    { metric: 'Load Variance',    target: '< 0.25',        unit: '' },
    { metric: 'Crash Rate',       target: '0',             unit: '' },
  ],
  rewardComponents: [
    { symbol: 'A_t', name: 'Acceptance Rate',  sign: '+', description: 'Successful task acceptance (Admission Control)' },
    { symbol: 'T_t', name: 'Throughput',       sign: '+', description: 'Tasks successfully processed per unit time' },
    { symbol: 'B_t', name: 'Load Balance',     sign: '+', description: 'Balanced utilization across N server nodes' },
    { symbol: 'L_t', name: 'Latency',          sign: '−', description: 'Average request execution + queuing delay (penalty)' },
    { symbol: 'D_t', name: 'Drop Rate',        sign: '−', description: 'Dropped/rejected tasks (hard SLA penalty)' },
    { symbol: 'O_t', name: 'Overload',         sign: '−', description: 'Server capacity overload events (penalty)' },
    { symbol: 'Q_t', name: 'Queue Congestion', sign: '−', description: 'Queue buffer backlog depth (proactive penalty)' },
  ],
}

// ============================================================
// REWARD FUNCTION ABLATION & SENSITIVITY FRAMEWORK
// ============================================================
export const REWARD_ABLATION_STUDY = [
  { variant: 'Full Reward (R_full)', excludedTerm: 'None (Baseline)', operationalPathology: 'Balanced multi-objective scheduling across throughput, latency, and SLA bounds.', primaryDegradation: 'None (Target Baseline)' },
  { variant: 'R \\ {A}', excludedTerm: 'Task Acceptance (A)', operationalPathology: 'Hyper-conservative policy; drops valid tasks to artificially keep latency low.', primaryDegradation: 'Task Acceptance Rate ↓' },
  { variant: 'R \\ {T}', excludedTerm: 'Throughput (T)', operationalPathology: 'Accepts tasks but lacks optimization signal to process and complete them efficiently.', primaryDegradation: 'Task Execution Yield / Sec ↓' },
  { variant: 'R \\ {B}', excludedTerm: 'Load Balance (B)', operationalPathology: 'Tasks concentrate on single compute-heavy node, triggering thermal and CPU bottlenecking.', primaryDegradation: 'Inter-Server Load Variance ↑' },
  { variant: 'R \\ {L}', excludedTerm: 'Latency (L)', operationalPathology: 'Maximizes raw throughput via task batching, severely inflating P95 tail latency.', primaryDegradation: 'End-to-End P95 Latency ↑' },
  { variant: 'R \\ {D}', excludedTerm: 'Dropped Tasks (D)', operationalPathology: 'Accepts tasks beyond queue capacity, incurring heavy drop penalties and SLA violations.', primaryDegradation: 'Request Drop Rate (%) ↑' },
  { variant: 'R \\ {O}', excludedTerm: 'Resource Overload (O)', operationalPathology: 'Allocates tasks beyond 100% server RAM/CPU capacity, triggering OOM crashes.', primaryDegradation: 'Server Capacity Breach Count ↑' },
  { variant: 'R \\ {Q}', excludedTerm: 'Queue Congestion (Q)', operationalPathology: 'Ignores buffer growth until tasks are dropped, missing early-warning proactive signals.', primaryDegradation: 'Buffer Backlog & Burst Drops ↑' },
]

export const OFAT_SENSITIVITY_CONFIG = {
  methodology: 'One-Factor-at-a-Time (OFAT) Sensitivity Analysis',
  multiplierLevels: [0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0],
  totalRuns: 49, // 7 terms x 7 scaling levels
  initialConfigurations: [
    { name: 'Balanced Initialization', weights: 'w0 = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]' },
    { name: 'Throughput-Biased', weights: 'w0 = [1.0, 10.0, 1.0, 0.1, 0.1, 0.1, 0.1]' },
    { name: 'Latency-Biased', weights: 'w0 = [1.0, 0.1, 1.0, 10.0, 0.1, 0.1, 0.1]' },
  ],
}

// ============================================================
// RESEARCH PAPER SECTIONS
// ============================================================
export const PAPER_SECTIONS = [
  { id: 'abstract',        title: 'Abstract',                     number: '' },
  { id: 'introduction',   title: 'Introduction',                  number: '1' },
  { id: 'background',     title: 'Background',                    number: '2' },
  { id: 'related-work',   title: 'Related Work',                  number: '3' },
  { id: 'datasets',       title: 'Workload Datasets',             number: '4' },
  { id: 'preprocessing',  title: 'Data Preprocessing',            number: '5' },
  { id: 'forecasting-models', title: 'Forecasting Models',        number: '6' },
  { id: 'forecasting-results','title': 'Forecasting Results',     number: '7' },
  { id: 'framework',      title: 'Proposed Framework',            number: '8' },
  { id: 'environment',    title: 'Cloud Environment',             number: '9' },
  { id: 'adaptive-reward','title': 'Adaptive Reward System',      number: '10' },
  { id: 'single-agent',   title: 'Single-Agent RL',               number: '11' },
  { id: 'ppo',            title: 'Proximal Policy Optimization',  number: '12' },
  { id: 'marl',           title: 'MARL Extension',                number: '13' },
  { id: 'implementation', title: 'Implementation Details',        number: '14' },
  { id: 'results',        title: 'Scheduling Results',            number: '15' },
  { id: 'discussion',     title: 'Discussion',                    number: '16' },
  { id: 'open-issues',    title: 'Open Issues',                   number: '17' },
  { id: 'conclusion',     title: 'Conclusion & Future Work',      number: '18' },
  { id: 'references',     title: 'References',                    number: '' },
]

// ============================================================
// REFERENCES (from paper)
// ============================================================
export const REFERENCES = [
  '[1] Battle Royale Deep Reinforcement Learning Algorithm for Effective Load Balancing in Cloud Computing; 2024.',
  '[2] Reinforcement Learning Approach for Optimizing Cloud Resource Utilization With Load Balancing; 2023.',
  '[3] Intelligent Decision-Making of Load Balancing Using Deep Reinforcement Learning and Parallel PSO; 2022.',
  '[4] Machine Learning-Based Load Balancing Algorithms in Future Heterogeneous Networks: A Survey; 2022.',
  '[5] A Load Balancing and Optimization Strategy (LBOS) Using Reinforcement Learning in Fog Computing Environment; 2020.',
  '[6] A Survey of Swarm Intelligence Based Load Balancing Techniques in Cloud Computing Environment; 2021.',
  '[7] A Load Balancing Algorithm for the Data Centres to Optimize Cloud Computing Applications; 2021.',
  '[8] Performance Analysis of Machine Learning Centered Workload Prediction Models for Cloud; 2023.',
  '[9] Reinforcement Learning Based Task Scheduling for Heterogeneous Computing in End-Edge-Cloud Environment; 2025.',
  '[10] Resource Allocation and Task Scheduling in Fog Computing and IoE Environments; 2022.',
  '[11] Load Balancing in Cloud Computing: A Big Picture; 2018.',
  '[12] Oliehoek FA, Amato C. A Concise Introduction to Decentralized POMDPs. vol. 1. Cham, Switzerland: Springer; 2016.',
  '[13] Lowe R, Wu Y, Tamar A, Harb J, Abbeel P, Mordatch I. Multi-Agent Actor-Critic for Mixed Cooperative-Competitive Environments. In: Proc. NeurIPS; 2017.',
  '[14] Rashid T, et al. QMIX: Monotonic Value Function Factorisation for Deep Multi-Agent Reinforcement Learning. In: Proc. ICML; 2018.',
  '[15] Foerster J, et al. Counterfactual Multi-Agent Policy Gradients. In: Proc. AAAI; 2018.',
  '[16] Yu C, et al. The Surprising Effectiveness of PPO in Cooperative Multi-Agent Games. In: Proc. NeurIPS Datasets and Benchmarks Track; 2022.',
]

// ============================================================
// BLOG / RESEARCH JOURNAL MILESTONES
// ============================================================
export const BLOG_POSTS = [
  {
    id: 1, week: 'Week 1–2', date: 'January 2024',
    title: 'Project Inception & Problem Identification',
    tag: 'Planning',
    summary: 'Identified the core problem: reactive cloud schedulers fail under dynamic workloads. Reviewed literature on cloud computing, load balancing, and RL-based scheduling. Defined research scope and objectives.',
    content: 'We began by extensively reviewing the limitations of traditional cloud scheduling algorithms like Round Robin and Least Connections. These algorithms make decisions based only on current state and cannot adapt to future workload changes. We identified that combining workload forecasting with RL-based scheduling could address this gap.',
  },
  {
    id: 2, week: 'Week 3–4', date: 'February 2024',
    title: 'Dataset Collection & Initial Analysis',
    tag: 'Dataset',
    summary: 'Collected and analyzed 7 real-world workload datasets: Google Cluster traces (v1, v2.1), Bitbrains GWA-T-12, Spitzer, XMM-Newton, Parallel Workloads Archive, and HPC2N.',
    content: 'Obtaining and processing diverse workload datasets was challenging. Google Cluster traces are massive; Bitbrains provided VM-level metrics; Spitzer and XMM-Newton provided scientific observation patterns with irregular bursts. Each dataset required custom parsing and normalization.',
  },
  {
    id: 3, week: 'Week 5–6', date: 'March 2024',
    title: 'Data Preprocessing Pipeline',
    tag: 'Preprocessing',
    summary: 'Implemented identical preprocessing for all datasets: chronological 80-20 split, 24-step sliding window, feature scaling. Intentionally avoided random shuffling to prevent future data leakage.',
    content: 'A key design decision was to use chronological evaluation rather than random shuffling. Random shuffling would introduce future information into the training period, producing unrealistically optimistic results. The 24-step input window balances context length with model complexity.',
  },
  {
    id: 4, week: 'Week 7–9', date: 'April 2024',
    title: 'Workload Forecasting Experiments',
    tag: 'Experiments',
    summary: 'Evaluated 7 forecasting models under identical conditions. Discovered temporal regime shift as a major factor causing deep learning model failures.',
    content: 'The results were surprising: all neural models (GRU, LSTM, BiLSTM, TCN, Transformer) severely underperformed under chronological evaluation. Investigation revealed that the final 20% of workload data contained traffic bursts and operating regimes not represented in the training period — temporal regime shift. SARIMAX\'s rolling one-step-ahead update made it more robust to this shift.',
  },
  {
    id: 5, week: 'Week 10', date: 'May 2024',
    title: 'SARIMAX Selected as Forecasting Backbone',
    tag: 'Milestone',
    summary: 'SARIMAX achieved RMSE=0.0708, R²=0.270 — best among all 7 models. Selected as the forecasting component for the RL framework.',
    content: 'SARIMAX demonstrated greater robustness under temporal distribution shift compared to all deep learning models. The rolling one-step-ahead forecasting strategy updates the model state using the latest true observation, enabling faster adaptation to changing workload conditions. This was a key architectural decision for the project.',
  },
  {
    id: 6, week: 'Week 11–12', date: 'June 2024',
    title: 'Cloud Simulation Environment Design',
    tag: 'Development',
    summary: 'Designed and implemented a heterogeneous cloud simulation environment with 6 server types and 5 task categories. Exposed as a Gymnasium environment.',
    content: 'The simulation environment models six heterogeneous server types (Compute Optimized, Memory Optimized, GPU Server, Storage Server, General Purpose, Low Power) and five task categories (Video Encoding, AI Inference, SQL Analytics, File Backup, Web API). Gymnasium was used to expose this as a standard RL environment.',
  },
  {
    id: 7, week: 'Week 13–14', date: 'July 2024',
    title: 'Single-Agent PPO Scheduler Implementation',
    tag: 'Development',
    summary: 'Implemented and trained single-agent PPO using Stable-Baselines3. State space: 50 features. Action space: server selection.',
    content: 'The PPO scheduler observes 50 features (11 per server × 4 servers + 6 task features) and selects one of N servers for each incoming task. Training used 300-step episodes with learning rate 3×10⁻⁴, batch size 256, and discount factor 0.99.',
  },
  {
    id: 8, week: 'Week 15', date: 'August 2024',
    title: 'PPO Evaluation Results',
    tag: 'Results',
    summary: 'PPO achieved highest throughput (0.590) and lowest drop rate (41.00%) vs Round Robin, Least Connections, and Random scheduling. Trade-off: higher CPU utilization and latency.',
    content: 'PPO outperformed all traditional schedulers on throughput and drop rate. However, Least Connections achieved better latency and load variance, revealing an inherent trade-off between aggressive resource utilization and response time quality.',
  },
  {
    id: 9, week: 'Week 16–18', date: 'September 2024',
    title: 'Adaptive Dynamic Reward System Design',
    tag: 'Architecture',
    summary: 'Designed AdaptiveRewardManager: automatically re-weights reward coefficients based on episode violations. Removes need for manual reward tuning.',
    content: 'A key limitation of the fixed-weight PPO baseline is that its coefficients are manually chosen and remain constant throughout training. The AdaptiveRewardManager addresses this by computing normalized errors against target service objectives, converting violations into relative priority scores, and updating reward weights via Equation (15) with learning rate η.',
  },
  {
    id: 10, week: 'Week 19–20', date: 'October 2024',
    title: 'Multi-Agent RL (MAPPO) Architecture Design',
    tag: 'Architecture',
    summary: 'Formulated scheduling as a Dec-POMDP. Each server = one agent with local observation (19 features). CTDE training with shared AdaptiveRewardManager.',
    content: 'The MARL formulation decentralizes scheduling across per-server agents. Each agent\'s local observation (19 features: 11 server state + 6 task features + 2 neighbor summary) remains fixed regardless of cluster size, solving the scalability issue of the centralized PPO agent. Parameter sharing across actor networks improves sample efficiency.',
  },
  {
    id: 11, week: 'Week 21–22', date: 'November 2024',
    title: 'Paper Writing & Documentation',
    tag: 'Writing',
    summary: 'Wrote the complete research paper covering all experiments, architecture designs, and future work. Submitted to Journal of Cloud Computing (Springer).',
    content: 'The paper documents our complete methodology, from dataset collection through forecasting evaluation to RL scheduler design. We explicitly note that the MARL extension is a fully specified architectural contribution with empirical evaluation as the immediate next phase.',
  },
  {
    id: 12, week: 'Future Work', date: '2025 Planned',
    title: 'Future Work: MAPPO Evaluation & Integration',
    tag: 'Future',
    summary: 'Next phase: implement and evaluate MAPPO empirically, integrate SARIMAX forecasts into RL state, Kubernetes deployment.',
    content: 'The immediate next phase is: (1) run AdaptiveRewardManager with single-agent PPO to isolate adaptive reward effect; (2) implement Dec-POMDP environment and MAPPO training pipeline; (3) compare all four configurations: PPO-fixed, PPO-adaptive, MAPPO-fixed, MAPPO-adaptive. Long-term: Kubernetes deployment and end-to-end forecasting+scheduling integration.',
  },
]
