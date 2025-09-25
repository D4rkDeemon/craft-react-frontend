import strict from "./Scroll.module.css";

export function Scroll() {
  return (
    <div className={strict.scrollContainer}>
      <h1>Scroll Component</h1>
      <p>This is a simple scroll component.</p>
      <div className={strict.scrollContent}>
        <p>Content goes here...</p>
        <p>More content...</p>
        <p>Even more content...</p>
        <p>Keep scrolling...</p>
        <p>Almost there...</p>
        <p>You made it!</p>
      </div>
    </div>
  );
}