import { techMap } from '@/utils/constants/tech-map';

export function getDeviconClass(techName: string): string {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase();
  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : 'devicon-devicon-plain';
}
