import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { resolveFfcvClub } from '../src/services/ffcvClubResolver';

export interface LocalCrestAuditItem {
  opponentName: string;
  federationClubId: string | null;
  officialName: string;
  verificationStatus: string;
  crestStatus: string;
  localPath?: string;
  sha256?: string;
  fileSizeBytes?: number;
  mimeType?: string;
}

const OUT_DIR = path.join(__dirname, '../tmp/ffcv-club-crests');

export function ensureTmpCrestDir(): string {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }
  return OUT_DIR;
}

export function computeSha256(buffer: Buffer): string {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}
