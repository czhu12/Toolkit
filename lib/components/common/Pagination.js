import { pagination } from "../../utils/pagination"

export default function Pagination({currentPage, totalPages, onClick}) {
  const pages = pagination(totalPages, currentPage, 1);
  return (
    <nav className="pagination">
      <ul className="pagination-list">
        {pages.map((page) => {
          if (page === "...") {
            return (
              <li>
                <a className="pagination-link is-disabled">{page}</a>
              </li>
            );
          } else {
            return (
              <li>
                <a onClick={() => onClick(page)} className={`pagination-link ${page === currentPage && "is-current"}`}>{page}</a>
              </li>
            );
          }
        })}
      </ul>
    </nav>
  )
}