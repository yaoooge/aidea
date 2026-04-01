export interface EmptyStateProps {
  title: string;
  description?: string;
}

export const createEmptyState = (title: string, description?: string): EmptyStateProps => ({
  title,
  description
});
