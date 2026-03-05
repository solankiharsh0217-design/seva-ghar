import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

const bookingsRef = collection(db, 'bookings');

export const bookingsService = {
  async getAll(userId = null) {
    let q = query(bookingsRef, orderBy('createdAt', 'desc'));
    if (userId) {
      q = query(bookingsRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const docRef = doc(db, 'bookings', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  },

  async create(data) {
    const payload = {
      ...data,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(bookingsRef, payload);
    return { id: docRef.id, ...payload };
  },

  async update(id, data) {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  },

  async cancel(id) {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, { 
      status: 'cancelled', 
      updatedAt: serverTimestamp() 
    });
  }
};

const servicesRef = collection(db, 'services');

export const servicesService = {
  async getAll() {
    const q = query(servicesRef, where('active', '==', true), orderBy('order'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const docRef = doc(db, 'services', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  }
};

const karigarsRef = collection(db, 'karigars');

export const karigarsService = {
  async getAll(area = null, service = null) {
    let q = query(karigarsRef, where('available', '==', true));
    const snapshot = await getDocs(q);
    let karigars = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (area) {
      karigars = karigars.filter(k => k.area === area);
    }
    if (service) {
      karigars = karigars.filter(k => k.skills?.includes(service));
    }
    return karigars;
  },

  async getById(id) {
    const docRef = doc(db, 'karigars', id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() };
  }
};

const reviewsRef = collection(db, 'reviews');

export const reviewsService = {
  async getByKarigar(karigarId) {
    const q = query(reviewsRef, where('karigarId', '==', karigarId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async create(data) {
    const payload = {
      ...data,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(reviewsRef, payload);
    return { id: docRef.id, ...payload };
  }
};

const materialQuotesRef = collection(db, 'materialQuotes');

export const materialsService = {
  async requestQuote(data) {
    const payload = {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(materialQuotesRef, payload);
    return { id: docRef.id, ...payload };
  }
};
