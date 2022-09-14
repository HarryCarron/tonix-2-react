import { PatchSearchResultItem } from './PatchSearchResultItem/PatchSearchResultItem';
import './PatchSearchResults.css';

export const PatchSearchResults = ({ filteredPatches = [] }) => {
    return (
        <div className="flex-1 results">
            {!!filteredPatches.length &&
                filteredPatches.map(patch => (
                    <PatchSearchResultItem {...patch} />
                ))}

            {!filteredPatches.length && (
                <div className="h-100 all-results center-child-xy no-res">
                    No results found
                </div>
            )}
        </div>
    );
};
