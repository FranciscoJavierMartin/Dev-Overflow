import { techDescriptionMap, techMap } from '@/utils/constants/tech-map';

export function getDeviconClass(techName: string): string {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase();
  return techMap[normalizedTechName]
    ? `${techMap[normalizedTechName]} colored`
    : 'devicon-devicon-plain';
}

export function getTechDescription(techName: string): string {
  const normalizedTechName = techName.replace(/[ .]/g, '').toLowerCase();
  return techDescriptionMap[normalizedTechName]
    ? `${techDescriptionMap[normalizedTechName]} colored`
    : `${techName} is a technology or tool widely used in web development, providing valuable features and capabilities`;
}
