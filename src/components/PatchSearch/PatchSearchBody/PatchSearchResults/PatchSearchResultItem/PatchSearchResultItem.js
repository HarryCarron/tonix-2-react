import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const PatchSearchResultItem = patch => {
    return (
        <div className="ps-result pointer">
            <div className="patch-title">{patch.name}</div>
            <div className="patch-desc">{patch.description}</div>
            <div className="tags-list d-flex">
                {patch.tags.map(tag => {
                    let classes = 'tag-pill ';
                    const isPop = tag === 'Popular';

                    if (isPop) {
                        classes += 'popular';
                    }

                    return (
                        <div className={classes}>
                            {tag}
                            {isPop && (
                                <FontAwesomeIcon
                                    className="popular-icon"
                                    icon={faHeart}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
