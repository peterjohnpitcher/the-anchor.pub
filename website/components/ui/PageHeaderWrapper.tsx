import { PageHeader } from './PageHeader';
import { getPageHeaderImage, getDefaultHeaderImage } from '@/utils/page-header-images';

interface PageHeaderWrapperProps {
  route: string;
  title: string;
  description?: string;
  minHeight?: string;
  showStatusBar?: boolean;
  children?: React.ReactNode;
}

export function PageHeaderWrapper({
  route,
  title,
  description,
  minHeight,
  showStatusBar,
  children
}: PageHeaderWrapperProps) {
  const headerImage = getPageHeaderImage(route) || getDefaultHeaderImage();
  
  return (
    <PageHeader
      title={title}
      description={description}
      imageSrc={headerImage.src}
      imageAlt={headerImage.alt}
      minHeight={minHeight}
      showStatusBar={showStatusBar}
    >
      {children}
    </PageHeader>
  );
}