import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPageData } from "../services/api";

const Bar = ({ className = "" }) => (
  <div className={`sk-shimmer rounded-lg bg-slate-200 ${className}`} />
);

// Generic CMS page (Terms and Conditions, etc.) rendered from /page-data/:slug
export default function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchPage = async () => {
      try {
        setLoading(true);
        setFailed(false);
        const res = await getPageData(slug);
        if (active) setPage(res);
      } catch (error) {
        console.error("Error fetching page:", error);
        if (active) {
          setPage(null);
          setFailed(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchPage();
    window.scrollTo({ top: 0 });
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="py-16 px-4 min-h-[60vh]" aria-busy="true" aria-label="Loading">
        <div className="max-w-4xl mx-auto">
          <Bar className="h-10 w-2/3 mb-4" />
          <Bar className="h-4 w-1/2 mb-10" />
          <Bar className="h-4 w-full mb-3" />
          <Bar className="h-4 w-full mb-3" />
          <Bar className="h-4 w-5/6 mb-3" />
          <Bar className="h-4 w-2/3" />
        </div>
      </section>
    );
  }

  if (failed || !page) {
    return (
      <section className="py-24 px-4 min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Page not found</h1>
        <p className="text-slate-600 mb-6">The page you are looking for is not available.</p>
        <Link to="/" className="text-purple-600 font-semibold hover:underline">
          Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 px-4 min-h-[60vh]">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A21CAF] to-[#2563EB]">
            {page.title}
          </span>
        </h1>

        {page.subtitle && <p className="text-lg text-slate-600 mb-2">{page.subtitle}</p>}

        {page.effective_date && (
          <p className="text-sm text-slate-500 mb-6">Effective date: {page.effective_date}</p>
        )}

        <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#A21CAF] to-[#2563EB]" />

        {page.image && (
          <img
            src={page.image}
            alt={page.title}
            className="mt-8 w-full max-h-[420px] object-cover rounded-2xl shadow-lg"
          />
        )}

        {/* plain text on purpose: admin content is not trusted as HTML */}
        {page.content && (
          <div className="mt-8 text-slate-700 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {page.content}
          </div>
        )}
      </article>
    </section>
  );
}
