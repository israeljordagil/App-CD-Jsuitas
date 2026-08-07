export type OpponentCrestStatus = 
  | 'PENDING' 
  | 'DOWNLOADED' 
  | 'CUSTOM' 
  | 'GENERIC_PLACEHOLDER' 
  | 'NOT_FOUND' 
  | 'ERROR';

export type OpponentVerificationStatus = 
  | 'VERIFIED' 
  | 'REVIEW_REQUIRED' 
  | 'AMBIGUOUS' 
  | 'NOT_FOUND';

export interface OpponentClub {
  id: string;
  federationClubId?: string | null;
  officialName: string;
  normalizedName: string;
  slug: string;
  crestSourceUrl?: string | null;
  crestStoragePath?: string | null;
  crestStorageUrl?: string | null;
  crestHash?: string | null;
  crestMimeType?: string | null;
  crestWidth?: number | null;
  crestHeight?: number | null;
  crestStatus: OpponentCrestStatus;
  source: 'FFCV' | string;
  sourceReference?: string | null;
  lastVerifiedAt?: string | null;
  verificationStatus: OpponentVerificationStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}
