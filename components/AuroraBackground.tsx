export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Pink Glow Blob */}
      <div className="absolute -top-[10%] -left-[10%] size-[50vw] rounded-full bg-pink-500/20 blur-[120px] animate-pulse" />
      
      {/* Purple Glow Blob */}
      <div className="absolute top-[20%] -right-[10%] size-[40vw] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse" />
      
      {/* Subtle Bottom Glow */}
      <div className="absolute -bottom-[20%] left-[20%] size-[40vw] rounded-full bg-blue-500/10 blur-[120px]" />
    </div>
  );
}