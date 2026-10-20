import { useEffect, useState } from "react";
import { Target } from "lucide-react";
import { getOurPurposeData } from "../services/api";
import { getFaIcon } from "../lib/faIcons";
import MissionVisionSkeleton from "../loader/MissionVisionSkeleton";

// alternate the accent colour per card (purple, blue, ...)
const ACCENTS = [
  { box: "bg-purple-50", icon: "text-purple-600" },
  { box: "bg-blue-50", icon: "text-blue-600" },
];

const MissionVision = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurpose = async () => {
      try {
        setLoading(true);
        setData(await getOurPurposeData());
      } catch (error) {
        console.error("Error fetching our purpose data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPurpose();
  }, []);

  if (loading) return <MissionVisionSkeleton />;

  const section = data?.section;
  const items = data?.items || [];
  if (!section) return null;

  // split the title around the highlighted word
  const { title = "", highlight_text: highlight } = section;
  const at = highlight ? title.indexOf(highlight) : -1;
  const before = at >= 0 ? title.slice(0, at) : title;
  const after = at >= 0 ? title.slice(at + highlight.length) : "";

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {before}
            {at >= 0 && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                {highlight}
              </span>
            )}
            {after}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto rounded-full"></div>
          {section.description && (
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">{section.description}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {items.map((item, index) => {
            const Icon = getFaIcon(item.icon, Target);
            const accent = ACCENTS[index % ACCENTS.length];

            return (
              <div
                key={item.id}
                className="group relative bg-white p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Soft Shadow Layer */}
                <div className="absolute inset-0 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500"></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 ${accent.box} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className={`w-8 h-8 ${accent.icon}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
