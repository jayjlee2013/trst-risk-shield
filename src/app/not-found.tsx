import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-black text-gold-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">페이지를 찾을 수 없습니다</h1>
        <p className="text-gray-400 mb-8">Page not found</p>
        <Link
          href="/"
          className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-8 py-3 rounded-lg transition-colors inline-block"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
