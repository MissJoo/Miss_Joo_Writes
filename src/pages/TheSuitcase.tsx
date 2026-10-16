import Layout from "@/components/layout/Layout";
import SuitcaseGame from "@/components/suitcase/SuitcaseGame";
import { suitcase } from "@/data/suitcase";

const TheSuitcase = () => (
  <Layout>
    <div className="sc-theme sc-page px-6 lg:px-12">
      <div className="sc-wrap">
        <header className="sc-header">
          <span className="sc-eyebrow">{suitcase.page.eyebrow}</span>
          <h1 className="sc-title">
            {suitcase.page.titleBefore} <em>{suitcase.page.titleEmphasis}</em>
          </h1>
          <p className="sc-intro">{suitcase.page.intro}</p>
        </header>
        <SuitcaseGame />
      </div>
    </div>
  </Layout>
);

export default TheSuitcase;
