// Helper to get correct asset paths with basePath
export const getAssetPath = (path: string): string => {
  // Only use basePath in production
  const basePath = process.env.NODE_ENV === 'production' 
    ? (process.env.NEXT_PUBLIC_BASE_PATH || '/ar/business-setup-saudi')
    : '';
  
  // If path already starts with basePath, return as is
  if (basePath && path.startsWith(basePath)) {
    return path;
  }
  
  // If path starts with /, add basePath
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }
  
  // Otherwise, add basePath and /
  return basePath ? `${basePath}/${path}` : `/${path}`;
};

// Common asset paths
export const ASSETS = {
  logo: getAssetPath('/Corpenta-Logo-Dark.png'),
  whatsappIcon: getAssetPath('/whatsapp-icon.svg'),
} as const;
