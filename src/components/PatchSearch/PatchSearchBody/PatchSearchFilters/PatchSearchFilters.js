export const PatchSearchFilters = () => {
    return (
        <div className="d-flex filters-container">
            <div className="d-flex-col grouping">
                Origin
                <select className="filter-select">
                    <option value="">Standard</option>
                    <option value="">My Patches</option>
                    <option value="" selected>
                        Community Patches
                    </option>
                </select>
            </div>
            <div className="d-flex-col grouping">
                Type
                <select className="filter-select">
                    <option value="">All</option>
                    <option value="">Lead</option>
                    <option value="">Pad</option>
                    <option value="">Bells</option>
                    <option value="">Plucks</option>
                    <option value="">Brass</option>
                    <option value="">Bass</option>
                </select>
            </div>
            <div className="d-flex-col grouping">
                Filter By
                <select className="filter-select">
                    <option value="">Alphabetic (ascending)</option>
                    <option value="">Alphabetic (descending)</option>
                    <option value="" selected>
                        Popularity
                    </option>
                    <option value="">Date Added</option>
                </select>
            </div>
        </div>
    );
};
