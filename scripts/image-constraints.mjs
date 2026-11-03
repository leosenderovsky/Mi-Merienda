export function getImageConstraintIssues(asset, { width, height, bytes }) {
  if (!asset || typeof asset !== 'object' || typeof asset.path !== 'string')
    throw new Error('x-asset debe incluir path.');

  const ratios = asset.ratios ?? (asset.ratio ? [asset.ratio] : []);
  const tolerance = asset.ratioTolerance ?? 0.02;
  const ratioValues = ratios.map((value) => {
    const match = /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?)$/.exec(value);
    if (!match) throw new Error(`Proporción x-asset inválida: ${value}`);
    return Number(match[1]) / Number(match[2]);
  });

  const issues = [];
  if (asset.minWidth !== undefined && width < asset.minWidth) issues.push('minWidth');
  if (asset.maxWidth !== undefined && width > asset.maxWidth) issues.push('maxWidth');
  if (ratioValues.length && !ratioValues.some((expected) => Math.abs(width / height - expected) <= tolerance))
    issues.push('ratio');
  if (asset.maxKB !== undefined && bytes > asset.maxKB * 1024) issues.push('maxKB');
  return issues;
}
