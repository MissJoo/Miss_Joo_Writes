import { Link } from "react-router-dom";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import { homeBoxNarrow, homeBoxSize, homeBoxStyle, homeText } from "@/components/suitcase/SuitcaseTeasers";

/** "A gift, from me to you": the free journal sign-up box, shown on the Journal page. */
const FreeJournalBox = () => (
  <div className={`${homeBoxSize} ${homeBoxStyle} ${homeBoxNarrow} flex flex-col justify-center text-center space-y-4`}>
    <span className="text-[10px] tracking-[0.3em] uppercase text-journal-gold font-sans font-medium block">
      A Gift, From Me to You
    </span>

    <h2 className="font-serif text-2xl md:text-3.5xl text-journal-text leading-tight">
      <span className="block">For the version of you</span>
      <span className="block">that&rsquo;s still becoming.</span>
    </h2>

    {/* Two lines from tablets up; phones are too narrow and wrap it */}
    <p className={`text-journal-text-secondary font-sans leading-relaxed text-sm md:text-base font-light ${homeText}`}>
      Quiet journals for the days life feels loud.
      <br className="hidden md:inline" /> A way to come back to yourself. It&rsquo;s FREE, and yours to keep.
    </p>

    <div>
      <EmailSignupForm variant="compact" />
    </div>

    <div>
      <Link
        to="/downloads"
        className="text-xs uppercase tracking-widest text-journal-gold hover:text-journal-text transition-colors duration-300 font-medium"
      >
        Peek inside the collection
      </Link>
    </div>
  </div>
);

export default FreeJournalBox;
