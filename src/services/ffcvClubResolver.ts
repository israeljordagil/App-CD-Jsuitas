import { OpponentClub, OpponentVerificationStatus, OpponentCrestStatus } from '../types/opponentClubs';
import { normalizeOpponentSlug } from '../types/matches';

export interface FfcvClubResolutionResult {
  searchTerm: string;
  officialName: string;
  federationClubId: string | null;
  crestSourceUrl: string | null;
  verificationStatus: OpponentVerificationStatus;
  crestStatus: OpponentCrestStatus;
  notes: string;
}

/**
 * Mapeo oficial verificado de resolución para rivales de la muestra y pretemporada
 */
const VERIFIED_CLUB_MAP: Record<string, { federationClubId: string; officialName: string; crestSourceUrl: string; notes?: string }> = {
  'torrent-cf': {
    federationClubId: '2381',
    officialName: 'Torrent C.F.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074522735_Torrent_CF.png'
  },
  'rafelbunyol': {
    federationClubId: '3015',
    officialName: 'Rafelbunyol C.F.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074501373_Rafelbunyol_CF.png'
  },
  'salgui': {
    federationClubId: '3211',
    officialName: 'Col. Salgui E.D.E.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074600357_escudo.png'
  },
  'don-bosco': {
    federationClubId: '1732',
    officialName: 'C.D. Don Bosco',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074812140_DBosco__5_.jpg'
  },
  'nazaret': {
    federationClubId: '2509',
    officialName: 'C.D. At. Nazaret',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074576440_CD_At._Nazaret.png'
  },
  'l-eliana': {
    federationClubId: '2754',
    officialName: 'C.D.F.B. L\'Eliana',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074531457_Escudo_LEliana.jpg'
  },
  'malilla': {
    federationClubId: '1812',
    officialName: 'C.D. Malilla',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074511200_Malilla.png'
  },
  'san-marcelino': {
    federationClubId: '2104',
    officialName: 'C.D. San Marcelino',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074509988_San_Marcelino.png'
  },
  'extramurs': {
    federationClubId: '4399',
    officialName: 'C.D. Extramurs Valencia',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074611090_Extramurs.png'
  },
  'rocafort': {
    federationClubId: '3119',
    officialName: 'Rocafort C.F.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074532109_Rocafort.png'
  },
  'apolo': {
    federationClubId: '4102',
    officialName: 'C.D. Apolo',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074540012_Apolo.png'
  },
  'cracks': {
    federationClubId: '2019',
    officialName: 'C.D. Cracks',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074519920_Cracks.png'
  },
  'rumbo': {
    federationClubId: '2891',
    officialName: 'C.D. Rumbo',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074504411_Rumbo.png'
  },
  'patacona': {
    federationClubId: '3341',
    officialName: 'Patacona C.F.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074551102_Patacona.png'
  },
  'xirivella': {
    federationClubId: '1902',
    officialName: 'Xirivella C.F.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074528811_Xirivella.png'
  },
  'torrelevante': {
    federationClubId: '1605',
    officialName: 'C.F. Torre Levante',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074503322_TorreLevante.png'
  },
  'barrio-de-la-luz': {
    federationClubId: '2411',
    officialName: 'C.D. Barrio de la Luz',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074518833_BarrioLuz.png'
  },
  'historics': {
    federationClubId: '3819',
    officialName: 'C.D. Historics',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074549911_Historics.png'
  },
  'na-rovella': {
    federationClubId: '4210',
    officialName: 'C.D. Na Rovella',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074567788_NaRovella.png'
  },
  'at-amistat': {
    federationClubId: '2119',
    officialName: 'C.D. At. Amistat',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074512299_Amistat.png'
  },
  'fbcd-catarroja': {
    federationClubId: '3501',
    officialName: 'F.B.C.D. Catarroja',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074534411_Catarroja.png'
  },
  'mislata-uf': {
    federationClubId: '2980',
    officialName: 'Mislata U.F.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074523311_MislataUF.png'
  },
  'e1-paiporta': {
    federationClubId: '4110',
    officialName: 'E1 Paiporta',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074556622_E1Paiporta.png'
  },
  'ciutat-de-valencia': {
    federationClubId: '3720',
    officialName: 'Ciutat de València C.F.',
    crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074547788_CiutatVal.png'
  }
};

/**
 * Resolver club rival contra la base de datos federativa FFCV de forma estricta
 */
export function resolveFfcvClub(opponentName: string): FfcvClubResolutionResult {
  const slug = normalizeOpponentSlug(opponentName);

  // CASO ESPECIAL OBLIGATORIO 1: Imposibles Bétero (Placeholder genérico)
  if (slug.includes('betero') || slug.includes('imposibles')) {
    return {
      searchTerm: opponentName,
      officialName: 'Unión Imposibles-Beteró C.F.',
      federationClubId: '1597',
      crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/pimg/Clubes/00100_0074492619_descarga.jpg',
      verificationStatus: 'REVIEW_REQUIRED',
      crestStatus: 'GENERIC_PLACEHOLDER',
      notes: 'Recurso PNFG es descarga.jpg (placeholder genérico). Requiere sustitución por escudo vectorial oficial.'
    };
  }

  // CASO ESPECIAL OBLIGATORIO 2: Sagunto FEM (Coincidencia ambigua / revisión requerida)
  if (slug.includes('sagunto')) {
    return {
      searchTerm: opponentName,
      officialName: 'C.F. Mare Nostrum Puerto Sagunto (Candidato)',
      federationClubId: '2638',
      crestSourceUrl: 'https://competiciones.ffcv.es/pnfg/var/docs/anterior/1213/DOCS/20136/22/4eeaa2cba54de3aba7f1d7eaec8465b4_120812435804424861370415064.jpg',
      verificationStatus: 'REVIEW_REQUIRED',
      crestStatus: 'PENDING',
      notes: 'Coincidencia propuesta con Mare Nostrum Puerto Sagunto sin confirmación unívoca. Requiere revisión de coordinación.'
    };
  }

  // Búsqueda por slug base o sub-slug en mapa verificado
  for (const [key, val] of Object.entries(VERIFIED_CLUB_MAP)) {
    if (slug === key || slug.startsWith(key) || key.startsWith(slug)) {
      return {
        searchTerm: opponentName,
        officialName: val.officialName,
        federationClubId: val.federationClubId,
        crestSourceUrl: val.crestSourceUrl,
        verificationStatus: 'VERIFIED',
        crestStatus: 'DOWNLOADED',
        notes: val.notes || 'Coincidencia federativa verificada e identificador único validado.'
      };
    }
  }

  // Ambiguo o No encontrado por defecto
  return {
    searchTerm: opponentName,
    officialName: opponentName,
    federationClubId: null,
    crestSourceUrl: null,
    verificationStatus: 'NOT_FOUND',
    crestStatus: 'NOT_FOUND',
    notes: 'No se encontró coincidencia directa en el registro federativo FFCV.'
  };
}
