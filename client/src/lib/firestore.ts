import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";
import type { Report, InsertReport } from "@shared/schema";

// Check if Firebase is properly configured
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && 
                             import.meta.env.VITE_FIREBASE_PROJECT_ID && 
                             import.meta.env.VITE_FIREBASE_APP_ID;

// Reports collection
const reportsCollection = collection(db, "reports");

export const reportsService = {
  // Create new report
  async createReport(reportData: InsertReport): Promise<string> {
    if (!isFirebaseConfigured) {
      throw new Error("Firebase configuration required. Please provide your Firebase credentials.");
    }
    const docRef = await addDoc(reportsCollection, {
      ...reportData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  // Get report by ID
  async getReport(id: string): Promise<Report | null> {
    const docRef = doc(reportsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { 
        id: docSnap.id, 
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: docSnap.data().updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
      } as Report;
    }
    return null;
  },

  // Update report
  async updateReport(id: string, reportData: Partial<Report>): Promise<void> {
    const docRef = doc(reportsCollection, id);
    await updateDoc(docRef, {
      ...reportData,
      updatedAt: serverTimestamp(),
    });
  },

  // Delete report
  async deleteReport(id: string): Promise<void> {
    const docRef = doc(reportsCollection, id);
    await deleteDoc(docRef);
  },

  // Get all reports
  async getReports(): Promise<Report[]> {
    if (!isFirebaseConfigured) {
      // Return empty array when Firebase isn't configured
      return [];
    }
    try {
      const q = query(reportsCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toISOString() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate()?.toISOString() || new Date().toISOString(),
      })) as Report[];
    } catch (error) {
      console.warn("Firebase connection issue:", error);
      return [];
    }
  },
};

// Photo upload service
export const photoService = {
  async uploadPhoto(file: File, path: string): Promise<string> {
    const storageRef = ref(storage, `reports/${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  },

  async deletePhoto(url: string): Promise<void> {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  },
};
