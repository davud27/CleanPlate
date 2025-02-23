interface SuggestionsDropdownProps {
  show: boolean;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export function SuggestionsDropdown({
  show,
  suggestions,
  onSuggestionClick,
}: SuggestionsDropdownProps) {
  if (!show || suggestions.length === 0) return null;

  return (
    <div className="absolute w-full bg-white dark:bg-gray-800 mt-1 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-60 overflow-y-auto">
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150"
          onClick={() => onSuggestionClick(suggestion)}
        >
          <div className="font-medium">{suggestion}</div>
        </div>
      ))}
    </div>
  );
}
