function Loading() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      <span className="ml-3 text-slate-600">
        Loading data...
      </span>
    </div>
  );
}

export default Loading;