## System Design

### Architecture
```
Frontend (React + Vite + TS)
├── Authentication Layer
├── API Client (axios and React Query)
├── State Management (Zustand)
├── Hybrid (LocalStorage and Database) (cart/wishlist)
└── Payment Integration
```

### Key Components Structure
```
src/
├── features/
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── wishlist/
│   └── checkout/
├── components/
│   ├── ui/ (buttons, inputs, modals)
│   └── layouts/
├── hooks/
├── services/ (API calls)
├── store/ (state management)
├── types/
└── utils/
```

## Product Requirements

### 1. **Authentication**
- Login/Register (email)
- OTP for account verification  
- JWT token management
- Protected routes
- Password reset
- Session persistence

### 2. **Product Catalog**
- Product listing (grid/list view)
- Search & filters (category, price, etc.)
- Product detail page
- Image gallery
- Product variants (size, color)
- Pagination/infinite scroll

### 3. **Wishlist**
- Add/remove products
- Persist in local storage + backend sync
- Wishlist page
- Move to cart action

### 4. **Shopping Cart**
- Add/remove/update quantity
- Persist across sessions
- Real-time price calculation
- Stock validation
- Cart summary navbar
- Empty cart state

### 5. **Checkout Flow**
- Multi-step form (shipping, payment, review)
- Address management
- Order summary
- Promo code support
- Payment gateway integration (Stripe/Paystack)
- Order confirmation

### 6. **User Profile**
- Order history
- Saved addresses
- Payment methods
- Account settings

## Technical Stack

### Core
```json
{
  "react": "^18",
  "vite": "^5",
  "typescript": "^5",
  "react-router-dom": "^6"
}
```

### State & Data
- **State**: Zustand (lightweight)
- **API**: Axios + React Query (caching, refetching)
- **Forms**: React Hook Form + Zod validation

### UI & Styling
- Tailwind CSS v4
- Radix UI
- lucide-react (icons)
- Framer Motion (animations)

### Payment
- Stripe Elements / Paystack Inline
- Webhook handling (backend)

### Other
- JWT storage (httpOnly cookies preferred, or secure localStorage)
- Environment variables (.env)

## Data Flow

```
External API → React Query Cache → Zustand Store → Components
                                ↓
                         Local Storage with backend sync (cart/wishlist)
```

### API Integration Points
1. **Products API** (external platform)
   - GET /products
   - GET /products/:id
   - GET /products/search

2. **Your Backend**
   - POST /auth/login|register
   - GET /user/profile
   - POST /wishlist
   - POST /orders
   - POST /checkout

## Key Features Priority

1. Auth (login/register)
2. Product listing + detail
3. Cart (localStorage with backend sync)
4. Basic checkout + payment
5. Wishlist
6. Order history
7. Profile management
8. Search & filters

## State Management Strategy

```typescript
// stores/useCartStore.ts
interface CartItem {
  productId: string;
  quantity: number;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
}
```

Similar stores for: auth, wishlist, checkout

## Performance Optimizations
- Code splitting (lazy load routes)
- Image optimization (next-gen formats)
- React Query for API caching
- Debounce search inputs
- Virtual scrolling for large lists
- Prefetch product details on hover

**Marketplace cart and wishlist management:**
```
✅ Hybrid approach
✅ LocalStorage for speed + UX
✅ Backend for persistence + cross-device
✅ Sync on login, debounced updates
```